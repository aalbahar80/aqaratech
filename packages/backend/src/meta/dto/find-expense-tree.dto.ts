import { IsOptional } from 'class-validator';
import { IsID } from 'src/decorators/field.decorators';

export class FindExpenseTreeDto {
  @IsOptional()
  @IsID()
  organizationId?: string;

  @IsOptional()
  @IsID()
  portfolioId?: string;

  @IsOptional()
  @IsID()
  propertyId?: string;

  @IsOptional()
  @IsID()
  unitId?: string;
}
