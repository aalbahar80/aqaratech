import { IntersectionType, PartialType } from '@nestjs/swagger';
import { IsPositive, IsString } from 'class-validator';

export interface ExpenseCategory {
  id: number;
  parentId: number | null;
  labelEn: string;
  labelAr: string;
}

class ExpenseCategoryRequiredDto implements Partial<ExpenseCategory> {
  @IsPositive()
  id: number;

  @IsString()
  labelEn: string;
}

class ExpenseCategoryOptionalDto implements Partial<ExpenseCategory> {
  @IsPositive()
  parentId: number | null = null;

  @IsString()
  labelAr: string = '';

  @IsString()
  description: string | null = null;
}

export class ExpenseCategoryDto
  extends IntersectionType(
    ExpenseCategoryRequiredDto,
    PartialType(ExpenseCategoryOptionalDto),
  )
  implements Partial<ExpenseCategory> {}

export class CreateExpenseCategoryDto
  extends IntersectionType(
    ExpenseCategoryRequiredDto,
    PartialType(ExpenseCategoryOptionalDto),
  )
  implements Partial<ExpenseCategory> {}

export class UpdateExpenseCategoryDto extends PartialType(
  CreateExpenseCategoryDto,
) {}
