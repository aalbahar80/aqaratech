import {
  ApiHideProperty,
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Lease } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
  BreadcrumbDto,
  BreadcrumbsDto,
  IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { DateType } from 'src/decorators/date-type.decorator';
import { Nanoid } from 'src/decorators/field.decorators';
import { UnitDto } from 'src/units/dto/unit.dto';

class LeaseRequiredDto {
  @Nanoid()
  tenantId: string;

  @Nanoid()
  unitId: string;

  @DateType()
  start: Date;

  @DateType()
  end: Date;

  @IsPositive()
  monthlyRent: number;
}

class LeaseOptionalDto {
  @IsNumber()
  deposit: number;

  @IsBoolean()
  canPay: boolean;

  @IsBoolean()
  notify: boolean;

  @IsString()
  license: string | null;
}

class LeaseBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'tenant',
  'portfolio',
  'property',
  'unit',
]) {}

export class LeaseDto extends IntersectionType(
  AbstractDto,
  IntersectionType(LeaseRequiredDto, LeaseOptionalDto),
) {
  constructor(partial: Partial<LeaseDto>) {
    super();
    Object.assign(this, partial);
  }

  @ApiHideProperty()
  @Exclude()
  tenant: IBreadcrumbs['tenant'];

  @ApiHideProperty()
  @Exclude()
  unit: IBreadcrumbs['unit'];

  @ApiProperty()
  @Expose()
  get breadcrumbs(): LeaseBreadcrumbsDto {
    const unit = new UnitDto(this.unit);
    return {
      portfolio: unit.breadcrumbs.portfolio,
      property: unit.breadcrumbs.property,
      unit: unit.breadcrumbs.unit,
      tenant: new BreadcrumbDto({
        rel: Rel.Tenant,
        ...this.tenant,
      }),
    };
  }
}

export class CreateLeaseDto
  extends IntersectionType(LeaseRequiredDto, PartialType(LeaseOptionalDto))
  implements Partial<Lease> {}

export class UpdateLeaseDto extends PartialType(
  OmitType(CreateLeaseDto, ['tenantId', 'unitId']),
) {}
