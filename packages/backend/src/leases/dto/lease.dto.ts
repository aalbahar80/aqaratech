import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Lease } from '@prisma/client';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class LeaseRequiredDto {
  @Nanoid()
  tenantId: string;

  @Nanoid()
  unitId: string;

  @IsISO8601()
  start: Date;

  @IsISO8601()
  end: Date;

  @IsPositive()
  monthlyRent: number;
}

class LeaseOptionalDto {
  @IsNumber()
  deposit: number = 0;

  @IsBoolean()
  deactivated: boolean = false;

  @IsBoolean()
  notify: boolean = true;

  @IsString()
  license: string | null = null;
}

export class LeaseBasicDto extends IntersectionType(
  LeaseRequiredDto,
  LeaseOptionalDto,
) {}

export class LeaseDto extends IntersectionType(AbstractDto, LeaseBasicDto) {
  ext: LeaseExtendedDto;
  breadcrumbs: LeaseBreadcrumbsDto;
}

export class CreateLeaseDto
  extends IntersectionType(LeaseRequiredDto, PartialType(LeaseOptionalDto))
  implements Partial<Lease> {}

export class UpdateLeaseDto extends PartialType(
  OmitType(CreateLeaseDto, ['tenantId', 'unitId']),
) {}

export class LeaseExtendedDto {
  tenantName: string;
  address: string;
  unitLabel: string;
}

export class LeaseBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'tenant',
  'portfolio',
  'property',
  'unit',
]) {}
