import { Controller, Get, Query } from '@nestjs/common';
import { CompareService } from './compare.service';

@Controller('compare')
export class CompareController {
  constructor(private readonly compareService: CompareService) {}

  @Get()
  compare(
    @Query('company1') company1: string,
    @Query('company2') company2: string,
    @Query('role') role: string,
    @Query('level') level: string,
    @Query('city1') city1?: string,
    @Query('city2') city2?: string,
  ) {
    return this.compareService.compare({
      company1,
      company2,
      role,
      level,
      city1,
      city2,
    });
  }
}