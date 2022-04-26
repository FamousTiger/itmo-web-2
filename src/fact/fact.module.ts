import { Module } from '@nestjs/common';
import { FactService } from './fact.service';
import { PrismaService } from '../prisma.service';
import { FactController } from './fact.controller';

@Module({
  providers: [FactService, PrismaService],
  controllers: [FactController],
})
export class FactModule {}
