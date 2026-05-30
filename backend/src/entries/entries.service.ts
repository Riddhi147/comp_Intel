import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEntryDto } from './entries.schema';


export interface EntryFilters {
  companySlug?: string;
  normalizedRole?: string;
  normalizedLevel?: string;
  city?: string;
  minYoe?: number;
  maxYoe?: number;
  page?: number;
  limit?: number;
}

@Injectable()
export class EntriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: EntryFilters) {
    const {
      companySlug,
      normalizedRole,
      normalizedLevel,
      city,
      minYoe,
      maxYoe,
      page = 1,
      limit = 20,
    } = filters;

    const skip = (page - 1) * limit;

    // Build where clause dynamically
    const where: any = { status: 'approved' };

    if (companySlug) {
      where.company = { slug: companySlug };
    }

    if (normalizedRole) {
      where.role = { normalizedTitle: normalizedRole };
    }

    if (city) {
      where.location = { city };
    }

    if (minYoe !== undefined || maxYoe !== undefined) {
      where.yearsOfExp = {};
      if (minYoe !== undefined) where.yearsOfExp.gte = minYoe;
      if (maxYoe !== undefined) where.yearsOfExp.lte = maxYoe;
    }

    // If normalizedLevel filter, we need to join through LevelMapping
    if (normalizedLevel) {
      const mappings = await this.prisma.levelMapping.findMany({
        where: { normalizedLevel },
        select: { companyLevel: true, companyId: true },
      });

      where.OR = mappings.map((m) => ({
        companyId: m.companyId,
        level: m.companyLevel,
      }));
    }

    const [entries, total] = await Promise.all([
      this.prisma.salaryEntry.findMany({
        where,
        skip,
        take: limit,
        orderBy: { submittedAt: 'desc' },
        include: {
          company: { select: { name: true, slug: true } },
          role: { select: { name: true, normalizedTitle: true } },
          location: { select: { city: true, metro: true } },
        },
      }),
      this.prisma.salaryEntry.count({ where }),
    ]);

    return {
      data: entries,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  


  async create(dto: CreateEntryDto) {
  // 1. Look up company
  const company = await this.prisma.company.findUnique({
    where: { slug: dto.companySlug },
  });
  if (!company) throw new NotFoundException(`Company '${dto.companySlug}' not found`);

  // 2. Look up role
  const role = await this.prisma.role.findFirst({
    where: { normalizedTitle: dto.normalizedRole },
  });
  if (!role) throw new NotFoundException(`Role '${dto.normalizedRole}' not found`);

  // 3. Look up location
  const location = await this.prisma.location.findFirst({
    where: { city: dto.city },
  });
  if (!location) throw new NotFoundException(`City '${dto.city}' not found`);

  // 4. Auto-calculate total comp
  const totalComp = dto.baseSalary + dto.annualBonus + dto.equityAnnual;

  // 5. Create entry
  return this.prisma.salaryEntry.create({
    data: {
      companyId: company.id,
      roleId: role.id,
      locationId: location.id,
      level: dto.level,
      yearsOfExp: dto.yearsOfExp,
      baseSalary: dto.baseSalary,
      annualBonus: dto.annualBonus,
      equityAnnual: dto.equityAnnual,
      totalComp,
      currency: dto.currency,
      status: 'approved',
    },
    include: {
      company: { select: { name: true, slug: true } },
      role: { select: { name: true, normalizedTitle: true } },
      location: { select: { city: true } },
    },
  });
  }
  
}