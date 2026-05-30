import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: '*',
    });

    const port = process.env.PORT || 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Application running on port ${port}`);
  } catch (error) {
    console.error('Failed to start:', error);
    process.exit(1);
  }
}
bootstrap();