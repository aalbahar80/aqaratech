import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export interface ExpenseCategory {
  id: number;
  parentId: number | null;
  labelEn: string;
  labelAr: string;
}

export class ExpenseCategoryDto implements Partial<ExpenseCategory> {
  @IsPositive()
  id: number;

  @IsString()
  labelEn: string;

  @IsPositive()
  @IsOptional()
  parentId?: number | null;

  @IsString()
  @IsOptional()
  labelAr?: string;

  @IsString()
  @IsOptional()
  description?: string | null;
}

export class CreateExpenseCategoryDto extends ExpenseCategoryDto {}

export class UpdateExpenseCategoryDto extends OmitType(
  CreateExpenseCategoryDto,
  ['id'],
) {}
