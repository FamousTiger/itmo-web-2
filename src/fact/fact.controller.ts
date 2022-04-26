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
import { FactService } from './fact.service';
import { FactDto } from './dto/fact.dto';
import { Fact } from '@prisma/client';

@Controller('fact')
export class FactController {
  constructor(private readonly factService: FactService) {}

  @ApiOperation({
    summary: 'Get all facts',
  })
  @ApiOkResponse({
    description: 'OK',
  })
  @Get('all')
  public async getAllFacts(): Promise<Fact[]> {
    return this.factService.facts({});
  }

  @ApiOperation({
    summary: 'Add a new fact',
  })
  @ApiOkResponse({
    description: 'Fact has been successfully added',
  })
  @Post('create')
  public async addFact(@Body() factData: FactDto): Promise<Fact> {
    const factToAdd = { fact: factData.fact };
    return await this.factService.createFact(factToAdd);
  }

  @ApiOperation({
    summary: 'Delete existing fact by ID',
  })
  @ApiOkResponse({
    description: 'Fact has been successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Fact not found',
  })
  @Delete(':id/delete')
  public async deleteFactById(@Param('id') id: number): Promise<Fact> {
    const factToDelete = await this.factService.fact({ id: Number(id) });
    if (factToDelete == null) {
      throw new HttpException('Fact not found', HttpStatus.BAD_REQUEST);
    }
    return this.factService.deleteFact({ id: Number(id) });
  }
}
