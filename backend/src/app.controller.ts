import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      status: 'ok',
      service: 'Comp Intel API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      routes: ['/entries', '/compare', '/insights'],
    };
  }
}