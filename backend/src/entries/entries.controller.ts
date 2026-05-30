import { Controller, Get, Post, Query, Body, UsePipes } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { CreateEntrySchema, type CreateEntryDto } from './entries.schema';

@Controller('entries')
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Get()
  findAll(
    @Query('company') companySlug?: string,
    @Query('role') normalizedRole?: string,
    @Query('level') normalizedLevel?: string,
    @Query('city') city?: string,
    @Query('minYoe') minYoe?: string,
    @Query('maxYoe') maxYoe?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.entriesService.findAll({
      companySlug,
      normalizedRole,
      normalizedLevel,
      city,
      minYoe: minYoe ? parseInt(minYoe) : undefined,
      maxYoe: maxYoe ? parseInt(maxYoe) : undefined,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 20,
    });
  }

  @Post()
  @UsePipes(new ZodValidationPipe(CreateEntrySchema))
  create(@Body() dto: CreateEntryDto) {
    return this.entriesService.create(dto);
  }
}