import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('healthz')
  getHealthz() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('healthcheck')
  getHealthcheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('api')
  getApi() {
    return { status: 'ok', message: 'API is running' };
  }

  @Get('api/health')
  getApiHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('api/healthz')
  getApiHealthz() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  @Get('api/healthcheck')
  getApiHealthcheck() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
