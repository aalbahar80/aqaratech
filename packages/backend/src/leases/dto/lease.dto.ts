import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { Lease } from '@prisma/client';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class LeaseRequiredDto extends AbstractDto {
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
  deposit = 0;

  @IsBoolean()
  deactivated = false;

  @IsBoolean()
  notify = true;

  @IsString()
  license: string | null = null;
}

export class LeaseDto extends IntersectionType(
  LeaseRequiredDto,
  LeaseOptionalDto,
) {}

export class CreateLeaseDto
  extends IntersectionType(LeaseRequiredDto, PartialType(LeaseOptionalDto))
  implements Partial<Lease> {}

export class UpdateLeaseDto extends PartialType(
  OmitType(CreateLeaseDto, ['tenantId', 'unitId']),
) {}
