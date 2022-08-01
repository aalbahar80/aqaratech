import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ExpenseCategoryDto {
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

  @IsBoolean()
  isGroup: boolean;
}

export class CreateExpenseCategoryDto extends ExpenseCategoryDto {}

export class UpdateExpenseCategoryDto extends CreateExpenseCategoryDto {}
