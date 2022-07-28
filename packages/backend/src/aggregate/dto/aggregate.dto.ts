import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsISO8601, IsOptional } from 'class-validator';
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

  @IsISO8601()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string' }) // override sdk generator. Otherwise, it'll always expect a date and throw otherwise.
  start?: Date;

  @IsISO8601()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string' })
  end?: Date;
}
