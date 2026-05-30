import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    console.log('PrismaService: Connecting to the database...');
    try {
      await this.$connect();
      console.log('PrismaService: Database connected successfully.');
    } catch (error) {
      console.error('PrismaService: Database connection failed:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}