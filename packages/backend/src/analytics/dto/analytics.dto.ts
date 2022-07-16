import { IsOptional } from 'class-validator';
import { Nanoid } from 'src/decorators/field.decorators';

export class ByMonthDto {
  amount: number;
  date: string;
}

export class DashboardFilterDto {
  @Nanoid()
  @IsOptional()
  propertyId?: string;

  @Nanoid()
  @IsOptional()
  unitId?: string;
}
