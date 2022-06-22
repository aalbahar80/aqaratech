import {
  ApiHideProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
import { Property } from '@prisma/client';
import { IsString, IsUUID, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class PropertyDto extends AbstractDto implements Property {
  @IsUUID()
  portfolioId: string;

  @Length(1, 255)
  area: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  block: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  avenue: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  street: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  number: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  parcel: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  paci: string | null = null;

  @ApiPropertyOptional()
  cost: number | null = null;

  @ApiHideProperty()
  long: number | null = null;

  @ApiHideProperty()
  lat: number | null = null;
}

export class UpdatePropertyDto extends PartialType(PropertyDto) {}
