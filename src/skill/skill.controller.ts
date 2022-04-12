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
import { SkillService } from './skill.service';
import { Skill } from '@prisma/client';

@Controller('skill')
export class SkillController {
  constructor(private skillService: SkillService) {}

  @ApiOperation({
    summary: 'Get all skills',
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
  public async getAllSkills(): Promise<Skill[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Add a new skill',
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
  public async addSkill(
    @Body() id: number,
    name = '',
    link: string,
  ): Promise<void> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Delete existing skill by ID',
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
  public async deleteSkillById(@Param('id') id: number): Promise<void> {
    throw new NotImplementedException();
  }
}
