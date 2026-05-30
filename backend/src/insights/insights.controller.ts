import { Controller, Get, Query } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  getInsights(
    @Query('company') companySlug?: string,
    @Query('role') normalizedRole?: string,
  ) {
    return this.insightsService.getInsights(companySlug, normalizedRole);
  }
}