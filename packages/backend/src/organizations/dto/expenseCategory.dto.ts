import { IsOptional, IsString } from 'class-validator';

export interface ExpenseCategory {
  id: string;
  parentId: string | null;
  labelEn: string;
  labelAr: string;
}

export class ExpenseCategoryDto implements Partial<ExpenseCategory> {
  constructor(partial: Partial<ExpenseCategoryDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  id: string;

  @IsString()
  labelEn: string;

  @IsString()
  @IsOptional()
  parentId: string | null;

  @IsString()
  @IsOptional()
  labelAr?: string;

  @IsString()
  @IsOptional()
  description?: string | null;
}

export class CreateExpenseCategoryDto extends ExpenseCategoryDto {}

export class UpdateExpenseCategoryDto extends CreateExpenseCategoryDto {}
