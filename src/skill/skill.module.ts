import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';

@Module({
  providers: [SkillService],
  controllers: [SkillController]
})
export class SkillModule {}
