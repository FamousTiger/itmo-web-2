import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotImplementedException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FactService } from './fact.service';
import { Fact } from '@prisma/client';

@Controller('fact')
export class FactController {
  constructor(private factService: FactService) {}

  @ApiOperation({
    summary: 'Get all facts',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Get('all')
  public async getAllFacts(): Promise<Fact[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Add a new fact',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Post('create')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async addFact(@Body() id: number, fact: string): Promise<void> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Delete existing fact by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied',
  })
  @Delete(':id/delete')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async deleteFactById(@Param('id') id: number): Promise<void> {
    throw new NotImplementedException();
  }
}
