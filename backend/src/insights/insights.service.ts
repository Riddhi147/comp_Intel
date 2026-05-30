import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InsightsService {
  constructor(private prisma: PrismaService) {}

  async getInsights(companySlug?: string, normalizedRole?: string) {
    // Build base filter
    const where: any = { status: 'approved' };

    if (companySlug) {
      where.company = { slug: companySlug };
    }

    if (normalizedRole) {
      where.role = { normalizedTitle: normalizedRole };
    }

    const entries = await this.prisma.salaryEntry.findMany({
      where,
      include: {
        company: { select: { name: true, slug: true } },
        role: { select: { name: true, normalizedTitle: true } },
        location: { select: { city: true } },
      },
    });

    if (entries.length === 0) {
      return { message: 'No data found for given filters', filters: { companySlug, normalizedRole } };
    }

    // Overall stats
    const overall = this.calcStats(entries.map((e) => e.totalComp));

    // Stats grouped by company
    const byCompany = this.groupAndCalc(entries, (e) => e.company.slug, (e) => ({
      name: e.company.name,
      slug: e.company.slug,
    }));

    // Stats grouped by normalized level
    const byLevel = this.groupAndCalc(entries, (e) => e.level, () => ({}));

    // Stats grouped by city
    const byCity = this.groupAndCalc(entries, (e) => e.location.city, () => ({}));

    // Stats grouped by role
    const byRole = this.groupAndCalc(entries, (e) => e.role.normalizedTitle, (e) => ({
      name: e.role.name,
    }));

    return {
      filters: { companySlug: companySlug ?? 'all', normalizedRole: normalizedRole ?? 'all' },
      sampleSize: entries.length,
      overall,
      byCompany,
      byLevel,
      byCity,
      byRole,
    };
  }

  private calcStats(values: number[]) {
    if (values.length === 0) return null;
    const sorted = [...values].sort((a, b) => a - b);
    return {
      sampleSize: sorted.length,
      median: this.percentile(sorted, 50),
      p25: this.percentile(sorted, 25),
      p75: this.percentile(sorted, 75),
      min: sorted[0],
      max: sorted[sorted.length - 1],
      avg: Math.round(sorted.reduce((a, b) => a + b, 0) / sorted.length),
    };
  }

  private groupAndCalc(
    entries: any[],
    keyFn: (e: any) => string,
    metaFn: (e: any) => object,
  ) {
    const groups: Record<string, { meta: object; values: number[] }> = {};

    for (const entry of entries) {
      const key = keyFn(entry);
      if (!groups[key]) {
        groups[key] = { meta: metaFn(entry), values: [] };
      }
      groups[key].values.push(entry.totalComp);
    }

    return Object.entries(groups).map(([key, { meta, values }]) => ({
      key,
      ...meta,
      ...this.calcStats(values),
    }));
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