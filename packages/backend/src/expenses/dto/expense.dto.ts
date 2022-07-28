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
import { ExpenseCategoryDto } from 'src/organizations/dto/expenseCategory.dto';

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
  @Nanoid()
  @IsOptional()
  maintenanceOrderId: string | null;

  // TODO use category name/prisma connect & set default here?
  categoryId: number | null;
}

export class ExpenseBasicDto extends IntersectionType(
  AbstractDto,
  IntersectionType(ExpenseRequiredDto, ExpenseOptionalDto),
) {}

export class ExpenseDto extends ExpenseBasicDto {
  breadcrumbs: ExpenseBreadcrumbsDto;
  expenseType: ExpenseCategoryDto | null;
}

export class CreateExpenseDto
  extends IntersectionType(ExpenseRequiredDto, PartialType(ExpenseOptionalDto))
  implements Partial<Expense> {}

export class UpdateExpenseDto extends PartialType(
  OmitType(CreateExpenseDto, ['portfolioId']),
) {}

export class ExpenseBreadcrumbsDto extends IntersectionType(
  PickType(BreadcrumbsDto, ['portfolio']),
  PartialType(PickType(BreadcrumbsDto, ['property', 'unit'])),
) {}
