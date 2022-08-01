import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateExpenseCategoryDto {
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

export class UpdateExpenseCategoryDto extends CreateExpenseCategoryDto {
  @IsString()
  id: string;
}

export class ExpenseCategoryDto extends UpdateExpenseCategoryDto {
  constructor(partial: Partial<ExpenseCategoryDto>) {
    super();
    Object.assign(this, partial);
  }
}
