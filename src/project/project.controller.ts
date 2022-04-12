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
import { ProjectService } from './project.service';
import { Project } from '@prisma/client';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Get all projects',
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
  public async getAllProjects(): Promise<Project[]> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Add a new project',
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
  public async addProject(
    @Body() id: string,
    name = '',
    link: string,
  ): Promise<void> {
    throw new NotImplementedException();
  }

  @ApiOperation({
    summary: 'Delete existing project by ID',
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
  public async deleteProjectById(@Param('id') id: number): Promise<void> {
    throw new NotImplementedException();
  }
}
