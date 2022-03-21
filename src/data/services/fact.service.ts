import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Fact, Prisma } from '@prisma/client';

@Injectable()
export class FactService {
  constructor(private prisma: PrismaService) {}

  async fact(
    factWhereUniqueInput: Prisma.FactWhereUniqueInput,
  ): Promise<Fact | null> {
    return this.prisma.fact.findUnique({
      where: factWhereUniqueInput,
    });
  }

  async facts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FactWhereUniqueInput;
    where?: Prisma.FactWhereInput;
    orderBy?: Prisma.FactOrderByWithRelationInput;
  }): Promise<Fact[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.fact.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createFact(data: Prisma.FactCreateInput): Promise<Fact> {
    return this.prisma.fact.create({
      data,
    });
  }

  async updateFact(params: {
    where: Prisma.FactWhereUniqueInput;
    data: Prisma.FactUpdateInput;
  }): Promise<Fact> {
    const { data, where } = params;
    return this.prisma.fact.update({
      data,
      where,
    });
  }

  async deleteFact(where: Prisma.FactWhereUniqueInput): Promise<Fact> {
    return this.prisma.fact.delete({
      where,
    });
  }
}
