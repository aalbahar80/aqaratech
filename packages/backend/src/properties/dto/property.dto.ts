import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
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
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class PropertyRequiredDto {
  @Nanoid()
  portfolioId: string;

  @Length(1, 255)
  area: string | null;
}

class PropertyOptionalDto {
  @IsString()
  block: string | null;

  @IsString()
  avenue: string | null;

  @IsString()
  street: string | null;

  @IsString()
  number: string | null;

  @IsString()
  parcel: string | null;

  @IsString()
  paci: string | null;

  @IsNumber()
  cost: number | null;

  @IsString()
  label: string | null;

  @IsLongitude()
  long: number | null;

  @IsLatitude()
  lat: number | null;
}

export class PropertyBasicDto extends IntersectionType(
  AbstractDto,
  IntersectionType(PropertyRequiredDto, PropertyOptionalDto),
) {}

export class PropertyDto extends PropertyBasicDto {
  breadcrumbs: PropertyBreadcrumbsDto;
}

export class CreatePropertyDto
  extends IntersectionType(
    PropertyRequiredDto,
    PartialType(PropertyOptionalDto),
  )
  implements Partial<Property> {}

export class UpdatePropertyDto extends PartialType(
  OmitType(CreatePropertyDto, ['portfolioId']),
) {}

export class PropertyBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'portfolio',
  'property',
]) {}
