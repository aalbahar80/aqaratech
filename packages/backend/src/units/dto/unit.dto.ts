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

export class UnitDto extends IntersectionType(
  UnitRequiredDto,
  UnitOptionalDto,
) {}

export class CreateUnitDto
  extends IntersectionType(UnitRequiredDto, PartialType(UnitOptionalDto))
  implements Partial<Unit> {}

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['propertyId']),
) {}

export class UnitVacancyDto extends UnitDto {
  @IsBoolean()
  isVacant: boolean;

  @IsString()
  vacancyDistance: string | null;

  @IsISO8601()
  vacancy: Date | null;
}

class UnitBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'portfolio',
  'property',
]) {}

class UnitTenantDto extends PickType(TenantDto, [
  'id',
  'fullName',
  'shortName',
]) {}

class UnitLeaseDto extends LeaseDto {
  @ApiProperty({ readOnly: true })
  tenant: UnitTenantDto;
}

export class UnitOneDto extends UnitVacancyDto {
  breadcrumbs: UnitBreadcrumbsDto;

  @ApiProperty({ readOnly: true })
  leases: UnitLeaseDto[];
}
