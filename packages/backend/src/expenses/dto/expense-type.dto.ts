import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { ExpenseType } from '@prisma/client';
import { IsPositive, IsString } from 'class-validator';

class ExpenseTypeRequiredDto implements Partial<ExpenseType> {
  @IsPositive()
  id: number;

  @IsString()
  labelEn: string;
}

class ExpenseTypeOptionalDto implements Partial<ExpenseType> {
  @IsPositive()
  parentId: number | null = null;

  @IsString()
  labelAr: string = '';

  @IsString()
  description: string | null = null;
}

export class ExpenseTypeDto
  extends IntersectionType(
    ExpenseTypeRequiredDto,
    PartialType(ExpenseTypeOptionalDto),
  )
  implements Partial<ExpenseType> {}

export class CreateExpenseTypeDto
  extends IntersectionType(
    ExpenseTypeRequiredDto,
    PartialType(ExpenseTypeOptionalDto),
  )
  implements Partial<ExpenseType> {}

export class UpdateExpenseTypeDto extends PartialType(
  OmitType(CreateExpenseTypeDto, ['id']),
) {}
