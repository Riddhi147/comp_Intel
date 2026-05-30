import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION:', reason);
});

async function bootstrap() {
  console.log('Bootstrap: Initializing NestJS application...');
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: '*',
    });

    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    console.log(`Bootstrap: Attempting to listen on port ${port}...`);
    await app.listen(port, '0.0.0.0');
    console.log(`Bootstrap: Application running on port ${port}`);
  } catch (error) {
    console.error('Bootstrap: Failed to start:', error);
    process.exit(1);
  }
}
bootstrap();