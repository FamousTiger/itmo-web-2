import { Module } from '@nestjs/common';
import { FactService } from './fact.service';
import { FactController } from './fact.controller';

@Module({
  providers: [FactService],
  controllers: [FactController]
})
export class FactModule {}
