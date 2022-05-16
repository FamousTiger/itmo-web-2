import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FactModule } from './fact/fact.module';
import { SkillModule } from './skill/skill.module';
import { ProjectModule } from './project/project.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { FirebaseApp } from './auth/firebase-app';
import { PreAuthMiddleware } from './auth/pre-auth-middleware';
import { AuthStrategy } from './auth/auth.strategy';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    FactModule,
    SkillModule,
    ProjectModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    FirebaseApp,
    AuthStrategy,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(PreAuthMiddleware).forRoutes({
      path: '/secure/*',
      method: RequestMethod.ALL,
    });
  }
}
