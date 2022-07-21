import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Tenant } from '@prisma/client';
import {
  IsISO31661Alpha3,
  IsISO8601,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';

class TenantRequiredDto {
  @Nanoid()
  organizationId: string;

  @Length(1, 255)
  fullName: string;
}

class TenantOptionalDto {
  @IsString()
  label: string | null = null;

  @IsString()
  civilid: string | null = null;

  @IsPhoneNumber('KW')
  phone: string | null = null;

  @IsISO8601()
  dob: Date | null = null;

  @IsString()
  passportNum: string | null = null;

  @IsISO31661Alpha3()
  nationality: string | null = null;

  @IsString()
  residencyNum: string | null = null;

  @IsISO8601()
  residencyEnd: Date | null = null;
}

export class TenantDto extends IntersectionType(
  AbstractDto,
  IntersectionType(TenantRequiredDto, TenantOptionalDto),
) {}

export class CreateTenantDto
  extends IntersectionType(TenantRequiredDto, PartialType(TenantOptionalDto))
  implements Partial<Tenant> {}

export class UpdateTenantDto extends PartialType(
  OmitType(CreateTenantDto, ['organizationId']),
) {}

class TenantLeaseDto extends PartialType(LeaseDto) {}

export class TenantOneDto extends TenantDto {
  @ApiProperty({ readOnly: true })
  leases: TenantLeaseDto[];
}
