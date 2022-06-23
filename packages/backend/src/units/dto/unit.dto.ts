import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class UnitDto extends AbstractDto implements Unit {
  @IsUUID()
  propertyId: string;

  @Length(1, 255)
  unitNumber: string;

  @ApiPropertyOptional()
  @IsNumber()
  floor: number | null = null;

  @ApiPropertyOptional()
  @IsPositive()
  size: number | null = null;

  @ApiPropertyOptional()
  @IsPositive()
  bed: number | null = null;

  @ApiPropertyOptional()
  @IsPositive()
  bath: number | null = null;

  @ApiPropertyOptional()
  @IsPositive()
  marketRent: number | null = null;

  @ApiPropertyOptional()
  @IsString()
  type: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  usage: string | null = null;
}

export class UpdateUnitDto extends PartialType(UnitDto) {}
