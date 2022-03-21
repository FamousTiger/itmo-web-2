import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './data/services/prisma.service';
import { FactService } from './data/services/fact.service';
import { SkillService } from './data/services/skill.service';
import { ProjectService } from './data/services/project.service';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    FactService,
    SkillService,
    ProjectService,
  ],
})
export class AppModule {}
