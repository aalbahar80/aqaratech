import {
  ApiProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';

export class UnitDto extends AbstractDto {
  @Nanoid()
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

  @ApiProperty()
  @IsString()
  type: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  usage: string | null = null;

  @ApiProperty({ readOnly: true })
  leases: LeaseDto[];
}

export class CreateUnitDto extends UnitDto implements Unit {}

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['propertyId']),
) {}
