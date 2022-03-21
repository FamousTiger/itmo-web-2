import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaService } from './data/services/prisma.service';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const hbs = require('hbs');
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));
  hbs.registerHelper('times', function (n, block) {
    let accum = '';
    for (let i = 1; i <= n; ++i) accum += block.fn(i);
    return accum;
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const port = app.get(ConfigService).get<number>('PORT') || 12345;
  await app.listen(port);
}
bootstrap();
