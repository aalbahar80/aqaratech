import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MetaService {
  constructor(private prisma: PrismaService) {}

  findExpenseTypes() {
    return this.prisma.expenseType.findMany();
  }
}
