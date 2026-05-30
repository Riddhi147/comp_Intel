import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { EntriesModule } from './entries/entries.module';
import { CompareModule } from './compare/compare.module';
import { InsightsModule } from './insights/insights.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EntriesModule,
    CompareModule,
    InsightsModule,
  ],
})
export class AppModule {}