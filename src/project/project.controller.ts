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
import { ProjectService } from './project.service';
import { ProjectDto } from './dto/project.dto';
import { Project } from '@prisma/client';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({
    summary: 'Get all projects',
  })
  @ApiOkResponse({
    description: 'OK',
  })
  @Get('all')
  public async getAllProjects(): Promise<Project[]> {
    return this.projectService.projects({});
  }

  @ApiOperation({
    summary: 'Add a new project',
  })
  @ApiOkResponse({
    description: 'Project has been successfully added',
  })
  @Post('create')
  public async addProject(@Body() projectData: ProjectDto): Promise<Project> {
    const projectToAdd = {
      id: projectData.id,
      name: projectData.name,
      link: projectData.link,
    };
    return await this.projectService.createProject(projectToAdd);
  }

  @ApiOperation({
    summary: 'Delete existing project by ID',
  })
  @ApiOkResponse({
    description: 'Project has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Project not found',
  })
  @Delete(':id/delete')
  public async deleteProjectById(@Param('id') id: string): Promise<Project> {
    const projectToDelete = await this.projectService.project({ id: id });
    if (projectToDelete == null) {
      throw new HttpException('Project not found', HttpStatus.BAD_REQUEST);
    }
    return this.projectService.deleteProject({ id: id });
  }
}
