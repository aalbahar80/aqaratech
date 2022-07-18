import {
  ApiHideProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Expense } from '@prisma/client';
import { IsISO8601, IsOptional, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class ExpenseRequiredDto {
  @Nanoid()
  portfolioId: string;

  @IsPositive()
  amount: number;

  @IsISO8601()
  postAt: Date;

  @IsString()
  memo: string | null;
}

class ExpenseOptionalDto {
  @Nanoid()
  @IsOptional()
  // TODO remove question mark?
  unitId?: string | null;

  @Nanoid()
  @IsOptional()
  // TODO remove question mark?
  propertyId?: string | null;

  // TODO remove from schema
  @ApiHideProperty()
  maintenanceOrderId: string | null;

  // TODO use category name/prisma connect & set default here?
  categoryId: number | null;
}

export class ExpenseDto extends IntersectionType(
  AbstractDto,
  IntersectionType(ExpenseRequiredDto, ExpenseOptionalDto),
) {
  breadcrumbs?: ExpenseBreadcrumbsDto;
}

export class CreateExpenseDto
  extends IntersectionType(ExpenseRequiredDto, PartialType(ExpenseOptionalDto))
  implements Partial<Expense> {}

export class UpdateExpenseDto extends PartialType(
  OmitType(CreateExpenseDto, ['portfolioId']),
) {}

export class ExpenseBreadcrumbsDto extends PartialType(
  PickType(BreadcrumbsDto, ['portfolio', 'property', 'unit']),
) {}
