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
  deposit: number;

  @IsBoolean()
  deactivated: boolean;

  @IsBoolean()
  notify: boolean;

  @IsString()
  license: string | null;
}

export class LeaseBasicDto extends IntersectionType(
  AbstractDto,
  IntersectionType(LeaseRequiredDto, LeaseOptionalDto),
) {}

export class LeaseDto extends LeaseBasicDto {
  breadcrumbs: LeaseBreadcrumbsDto;
}

export class CreateLeaseDto
  extends IntersectionType(LeaseRequiredDto, PartialType(LeaseOptionalDto))
  implements Partial<Lease> {}

export class UpdateLeaseDto extends PartialType(
  OmitType(CreateLeaseDto, ['tenantId', 'unitId']),
) {}

export class LeaseBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'tenant',
  'portfolio',
  'property',
  'unit',
]) {}
