import { BadRequestException, Injectable } from '@nestjs/common';
import { OrganizationSettings } from '@prisma/client';
import { FindExpenseTreeDto } from 'src/meta/dto/find-expense-tree.dto';
import { ExpenseCategoryDto } from 'src/expense-categories/expense-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetaService {
  constructor(private prisma: PrismaService) {}

  async findExpenseTypes({
    findExpenseTreeDto,
  }: {
    findExpenseTreeDto: FindExpenseTreeDto;
  }) {
    // TODO settings shouldn't be nullable
    let settings: OrganizationSettings | null;
    if (findExpenseTreeDto.unitId) {
      settings = await this.prisma.unit
        .findUnique({
          where: { id: findExpenseTreeDto.unitId },
        })
        .property()
        .portfolio()
        .organization()
        .organizationSettings();
    } else if (findExpenseTreeDto.propertyId) {
      settings = await this.prisma.property
        .findUnique({
          where: { id: findExpenseTreeDto.propertyId },
        })
        .portfolio()
        .organization()
        .organizationSettings();
    } else if (findExpenseTreeDto.portfolioId) {
      settings = await this.prisma.portfolio
        .findUnique({
          where: { id: findExpenseTreeDto.portfolioId },
        })
        .organization()
        .organizationSettings();
    } else if (findExpenseTreeDto.organizationId) {
      settings = await this.prisma.organization
        .findUnique({ where: { id: findExpenseTreeDto.organizationId } })
        .organizationSettings();
    } else {
      throw new BadRequestException(
        'No unit, property, portfolio, or organizaiton id provided',
      );
    }
    return settings!.expenseCategoryTree as unknown as ExpenseCategoryDto[]; // TODO rm !
  }
}
