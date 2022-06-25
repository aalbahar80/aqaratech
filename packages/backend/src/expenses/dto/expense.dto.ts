import { ApiHideProperty, PartialType } from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { IsISO8601, IsOptional, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

type IsNullable<T> = null extends T ? T : never;
type OptionalIfNullable<T> = {
  [P in keyof T]?: T[P] extends IsNullable<T[P]> ? T[P] | undefined : T[P];
};
export class ExpenseDto
  extends AbstractDto
  implements OptionalIfNullable<Expense>
{
  // TODO: constrain only one of the following fields to be set
  @Nanoid()
  @IsOptional()
  unitId?: string | null;

  @Nanoid()
  @IsOptional()
  propertyId?: string | null;

  @Nanoid()
  @IsOptional()
  portfolioId?: string | null;

  // TODO remove from schema
  @ApiHideProperty()
  maintenanceOrderId: string | null;

  // TODO use category name/prisma connect & set default here
  @ApiHideProperty()
  categoryId: number | null;

  @IsPositive()
  amount: number;

  @IsISO8601()
  postAt: Date;

  @IsString()
  memo: string | null;
}

export class UpdateExpenseDto extends PartialType(ExpenseDto) {}
