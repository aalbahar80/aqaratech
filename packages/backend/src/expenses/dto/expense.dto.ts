import { PartialType } from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { IsISO8601, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

export class ExpenseDto extends AbstractDto implements Expense {
  // TODO: constrain only one of the following fields to be set
  @Nanoid()
  unitId: string | null = null;

  @Nanoid()
  propertyId: string | null = null;

  @Nanoid()
  portfolioId: string | null = null;

  @Nanoid()
  maintenanceOrderId: string | null = null;

  // use category name
  categoryId: number | null = null;

  @IsPositive()
  amount: number;

  @IsISO8601()
  postAt: Date;

  @IsString()
  memo: string | null = null;
}

export class UpdateExpenseDto extends PartialType(ExpenseDto) {}
