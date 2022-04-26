import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { FactModule } from './fact/fact.module';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
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

  const config = new DocumentBuilder()
    .setTitle('Nikolay Fedotenko: Portfolio')
    .setDescription('My Portfolio API description')
    .setVersion('1.0')
    .addTag('ITMO')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [FactModule, SkillModule, ProjectModule],
  });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = app.get(ConfigService).get<number>('PORT') || 12345;
  await app.listen(port);
}
bootstrap();
