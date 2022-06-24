import {
  ApiHideProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
import { Property } from '@prisma/client';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

export class PropertyDto extends AbstractDto implements Property {
  @Nanoid()
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
  @IsNumber()
  cost: number | null = null;

  @ApiHideProperty()
  @IsLongitude()
  long: number | null = null;

  @ApiHideProperty()
  @IsLatitude()
  lat: number | null = null;
}

export class UpdatePropertyDto extends PartialType(PropertyDto) {}
