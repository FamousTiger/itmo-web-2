import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { PrismaService } from '../prisma.service';
import { SkillController } from './skill.controller';

@Module({
  providers: [SkillService, PrismaService],
  controllers: [SkillController],
})
export class SkillModule {}
