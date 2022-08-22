import {
  ApiHideProperty,
  ApiProperty,
  IntersectionType,
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
import { IsID } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { PropertyDto } from 'src/properties/dto/property.dto';

class UnitRequiredDto {
  @IsID()
  organizationId: string;

  @IsID()
  portfolioId: string;

  @IsID()
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

export class UpdateUnitDto extends PartialType(CreateUnitDto) {}

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

export class UnitDto
  extends IntersectionType(
    AbstractDto,
    IntersectionType(UnitRequiredDto, UnitOptionalDto),
  )
  implements Unit
{
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
    const isOccupied = this.leases.some(
      (l) => l.start <= new Date() && l.end >= new Date(),
    );
    const lease = this.leases[0];

    const vacancyDistance = lease?.end
      ? formatDistance(this.leases[0].end, new Date(), {
          addSuffix: true,
        })
      : '';

    const vacancyDate = lease?.end ?? null;

    return { isVacant: !isOccupied, vacancyDistance, vacancyDate };
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

export class PartialUnitDto extends PartialType(UnitDto) {}
