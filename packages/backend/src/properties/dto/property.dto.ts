import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Property } from '@prisma/client';
import { Expose } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbDto } from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
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

export class PropertyDto extends IntersectionType(
  AbstractDto,
  IntersectionType(PropertyRequiredDto, PropertyOptionalDto),
) {
  constructor(partial: Partial<PropertyDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty()
  @Expose()
  get address(): string {
    return [this.area, 'ق', this.block, 'م', this.number]
      .filter(Boolean)
      .join(' ');
  }

  @ApiProperty()
  @Expose()
  get breadcrumbs(): BreadcrumbDto {
    return {
      label: this.address,
      href: `/properties/${this.id}`,
      id: this.id,
      rel: Rel.Property, // TODO remove
    };
  }
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
