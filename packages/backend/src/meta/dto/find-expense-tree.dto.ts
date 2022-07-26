import { IsOptional } from 'class-validator';
import { Nanoid } from 'src/decorators/field.decorators';

export class FindExpenseTreeDto {
  @IsOptional()
  @Nanoid()
  portfolioId?: string;

  @IsOptional()
  @Nanoid()
  propertyId?: string;

  @IsOptional()
  @Nanoid()
  unitId?: string;
}
