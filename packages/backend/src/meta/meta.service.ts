import { Injectable } from '@nestjs/common';
import { UpdateExpenseTypeDto } from 'src/expenses/dto/expense-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetaService {
  constructor(private prisma: PrismaService) {}

  findExpenseTypes() {
    return this.prisma.expenseType.findMany();
  }

  async saveExpenseTypes({
    updateExpenseTypesDto,
  }: {
    updateExpenseTypesDto: UpdateExpenseTypeDto[];
  }) {
    console.log({ updateExpenseTypesDto }, 'meta.service.ts ~ 19');
    return updateExpenseTypesDto;
  }
}
