import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  // Railway injects PORT env variable — must use it
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application running on port ${port}`);
}
bootstrap();