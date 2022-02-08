import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = new ConfigService().get<number>('PORT') || 12345;
  await app.listen(port);
}
bootstrap();
