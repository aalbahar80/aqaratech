import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { DateType } from 'src/decorators/date-type.decorator';
import { Nanoid } from 'src/decorators/field.decorators';

export class ByMonthDto {
  amount: number;
  date: string;
}

export class DashboardFilterDto {
  @Nanoid()
  @IsOptional()
  portfolioId?: string;

  @Nanoid()
  @IsOptional()
  propertyId?: string;

  @Nanoid()
  @IsOptional()
  unitId?: string;

  @DateType(false)
  @IsOptional()
  start?: Date;

  @DateType(false)
  @IsOptional()
  end?: Date;
}
