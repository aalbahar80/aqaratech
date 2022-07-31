import {
  ApiHideProperty,
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { formatDistance } from 'date-fns';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
  BreadcrumbDto,
  BreadcrumbsDto,
  IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { Nanoid } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { PropertyDto } from 'src/properties/dto/property.dto';

class UnitRequiredDto {
  @Nanoid()
  propertyId: string;

  @Length(1, 255)
  unitNumber: string;
}

class UnitOptionalDto {
  @IsNumber()
  floor: number | null;

  @IsPositive()
  size: number | null;

  @IsPositive()
  bed: number | null;

  @IsPositive()
  bath: number | null;

  @IsPositive()
  marketRent: number | null;

  @IsString()
  type: string | null;

  @IsString()
  usage: string | null;

  @IsString()
  label: string | null;
}

// InputDtos

export class CreateUnitDto
  extends IntersectionType(UnitRequiredDto, PartialType(UnitOptionalDto))
  implements Partial<Unit> {}

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['propertyId']),
) {}

// OutputDtos

export class UnitBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'portfolio',
  'property',
  'unit',
]) {}

export class UnitVacancy {
  isVacant: boolean;
  vacancyDistance: string | null;
  vacancyDate: Date | null;
}

export class UnitDto extends IntersectionType(
  AbstractDto,
  IntersectionType(UnitRequiredDto, UnitOptionalDto),
) {
  constructor(partial: Partial<UnitDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiHideProperty()
  @Exclude()
  leases: Pick<LeaseDto, 'start' | 'end'>[];

  @ApiHideProperty()
  @Exclude()
  property: IBreadcrumbs['property'];

  @ApiProperty()
  @Expose()
  get vacancy(): UnitVacancy {
    const isVacant = this.leases.some(
      (l) => l.start <= new Date() && l.end >= new Date(),
    );
    const lease = this.leases[0];

    const vacancyDistance = lease?.end
      ? formatDistance(this.leases[0].end, new Date(), {
          addSuffix: true,
        })
      : '';

    const vacancyDate = lease?.end ?? null;

    return { isVacant, vacancyDistance, vacancyDate };
  }

  @ApiProperty()
  @Expose()
  get breadcrumbs(): UnitBreadcrumbsDto {
    const property = new PropertyDto(this.property);
    return {
      portfolio: property.breadcrumbs.portfolio,
      property: property.breadcrumbs.property,
      unit: new BreadcrumbDto({
        rel: Rel.Unit,
        ...this,
      }),
    };
  }
}
