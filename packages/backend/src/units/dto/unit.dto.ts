import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { HateoasDto } from 'src/common/dto/hateoas.dto';
import { Nanoid } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';

class UnitRequiredDto extends AbstractDto {
  @Nanoid()
  propertyId: string;

  @Length(1, 255)
  unitNumber: string;
}

class UnitOptionalDto {
  @IsNumber()
  floor: number | null = null;

  @IsPositive()
  size: number | null = null;

  @IsPositive()
  bed: number | null = null;

  @IsPositive()
  bath: number | null = null;

  @IsPositive()
  marketRent: number | null = null;

  @IsString()
  type: string | null = null;

  @IsString()
  usage: string | null = null;
}

// InputDtos

export class CreateUnitDto
  extends IntersectionType(UnitRequiredDto, PartialType(UnitOptionalDto))
  implements Partial<Unit> {}

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['propertyId']),
) {}

// OutputDtos

class AllFields extends IntersectionType(UnitRequiredDto, UnitOptionalDto) {}

class UnitBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'portfolio',
  'property',
]) {}

export class UnitDto extends IntersectionType(HateoasDto, AllFields) {
  breadcrumbs?: UnitBreadcrumbsDto;
  leases?: Pick<LeaseDto, 'id' | 'start' | 'end'>[];
  isVacant?: boolean;
  vacancyDistance?: string | null;
  vacancy?: Date | null;
}

// TODO get tenants from lease

// class UnitTenantDto extends PickType(TenantDto, [
//   'id',
//   'fullName',
//   'shortName',
// ]) {}

// class UnitLeaseDto extends LeaseDto {
// @ApiProperty({ readOnly: true })
// @ApiProperty({ type: () => Node })
// tenant: UnitTenantDto;
// }
