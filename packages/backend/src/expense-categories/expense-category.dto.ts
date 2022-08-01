import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Nanoid } from 'src/decorators/field.decorators';

export class CreateExpenseCategoryDto {
  @IsString()
  labelEn: string;

  @IsString()
  @IsOptional()
  parentId?: string | null;

  @IsString()
  @IsOptional()
  labelAr?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsBoolean()
  isGroup: boolean;
}

export class UpdateExpenseCategoryDto extends CreateExpenseCategoryDto {
  @Nanoid()
  id: string;
}

export class UpdateAllExpenseCategoriesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateExpenseCategoryDto)
  items: UpdateExpenseCategoryDto[];
}

export class ExpenseCategoryDto extends UpdateExpenseCategoryDto {
  constructor(partial: Partial<ExpenseCategoryDto>) {
    super();
    Object.assign(this, partial);
  }
}
