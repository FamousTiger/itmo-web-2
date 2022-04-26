import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { SkillService } from './skill.service';
import { SkillDto } from './dto/skill.dto';
import { Skill } from '@prisma/client';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({
    summary: 'Get all skills',
  })
  @ApiOkResponse({
    description: 'OK',
  })
  @Get('all')
  public async getAllSkills(): Promise<Skill[]> {
    return this.skillService.skills({});
  }

  @ApiOperation({
    summary: 'Add a new skill',
  })
  @ApiOkResponse({
    description: 'Skill has been successfully added',
  })
  @Post('create')
  public async addSkill(@Body() skillData: SkillDto): Promise<Skill> {
    const skillToAdd = {
      name: skillData.name,
      link: skillData.link,
    };
    return await this.skillService.createSkill(skillToAdd);
  }

  @ApiOperation({
    summary: 'Delete existing skill by ID',
  })
  @ApiOkResponse({
    description: 'Skill has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Skill not found',
  })
  @Delete(':id/delete')
  public async deleteSkillById(@Param('id') id: number): Promise<Skill> {
    const skillToDelete = await this.skillService.skill({ id: Number(id) });
    if (skillToDelete == null) {
      throw new HttpException('Skill not found', HttpStatus.BAD_REQUEST);
    }
    return this.skillService.deleteSkill({ id: Number(id) });
  }
}
