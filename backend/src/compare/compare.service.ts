import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CompareQuery {
  company1: string;
  company2: string;
  role: string;
  level: string; // normalized level: junior | mid | senior | staff
  city1?: string;
  city2?: string;
}

@Injectable()
export class CompareService {
  constructor(private prisma: PrismaService) {}

  async compare(query: CompareQuery) {
    const { company1, company2, role, level, city1, city2 } = query;

    if (!company1 || !company2 || !role || !level) {
      throw new BadRequestException('company1, company2, role, and level are required');
    }

    const [side1, side2] = await Promise.all([
      this.getSideData(company1, role, level, city1),
      this.getSideData(company2, role, level, city2),
    ]);

    return {
      role,
      normalizedLevel: level,
      side1,
      side2,
    };
  }

  private async getSideData(
    companySlug: string,
    normalizedRole: string,
    normalizedLevel: string,
    city?: string,
  ) {
    // 1. Find company
    const company = await this.prisma.company.findUnique({
      where: { slug: companySlug },
    });
    if (!company) return null;

    // 2. Find all company levels that map to this normalized level
    const mappings = await this.prisma.levelMapping.findMany({
      where: { companyId: company.id, normalizedLevel },
      select: { companyLevel: true },
    });
    const companyLevels = mappings.map((m) => m.companyLevel);

    if (companyLevels.length === 0) return null;

    // 3. Find role
    const role = await this.prisma.role.findFirst({
      where: { normalizedTitle: normalizedRole },
    });
    if (!role) return null;

    // 4. Build where clause
    const where: any = {
      companyId: company.id,
      roleId: role.id,
      level: { in: companyLevels },
      status: 'approved',
    };

    if (city) {
      const location = await this.prisma.location.findFirst({
        where: { city },
      });
      if (location) where.locationId = location.id;
    }

    // 5. Fetch all matching entries
    const entries = await this.prisma.salaryEntry.findMany({
      where,
      include: {
        location: { select: { city: true, colIndex: true } },
      },
    });

    if (entries.length === 0) {
      return {
        company: company.name,
        companySlug: company.slug,
        companyLevels,
        normalizedLevel,
        city: city ?? null,
        sampleSize: 0,
        message: 'Not enough data',
      };
    }

    // 6. Calculate stats
    const totalComps = entries.map((e) => e.totalComp).sort((a, b) => a - b);
    const baseSalaries = entries.map((e) => e.baseSalary);
    const bonuses = entries.map((e) => e.annualBonus);
    const equities = entries.map((e) => e.equityAnnual);

    const median = this.percentile(totalComps, 50);
    const p25 = this.percentile(totalComps, 25);
    const p75 = this.percentile(totalComps, 75);

    const avgBase = Math.round(baseSalaries.reduce((a, b) => a + b, 0) / baseSalaries.length);
    const avgBonus = Math.round(bonuses.reduce((a, b) => a + b, 0) / bonuses.length);
    const avgEquity = Math.round(equities.reduce((a, b) => a + b, 0) / equities.length);

    // 7. Location-adjusted TC (adjust by col index relative to Bangalore = 1.0)
    const avgColIndex = entries.reduce((sum, e) => sum + e.location.colIndex, 0) / entries.length;
    const adjustedMedianTC = Math.round(median / avgColIndex);

    // 8. TC breakdown percentages
    const total = avgBase + avgBonus + avgEquity;
    const breakdown = {
      basePercent: Math.round((avgBase / total) * 100),
      bonusPercent: Math.round((avgBonus / total) * 100),
      equityPercent: Math.round((avgEquity / total) * 100),
    };

    return {
      company: company.name,
      companySlug: company.slug,
      companyLevels,
      normalizedLevel,
      city: city ?? 'All cities',
      sampleSize: entries.length,
      tc: {
        median,
        p25,
        p75,
        adjustedMedianTC,
      },
      components: {
        avgBase,
        avgBonus,
        avgEquity,
      },
      breakdown,
    };
  }

  private percentile(sorted: number[], p: number): number {
    if (sorted.length === 0) return 0;
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return sorted[lower];
    return Math.round(sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower));
  }
}