import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Tenant } from '@prisma/client';
import {
  IsEmail,
  IsISO31661Alpha3,
  IsISO8601,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { UnitDto } from 'src/units/dto/unit.dto';

class TenantRequiredDto extends AbstractDto {
  @Nanoid()
  organizationId: string;

  @Length(1, 255)
  fullName: string;
}

class TenantOptionalDto {
  @IsString()
  shortName: string | null = null;

  @IsString()
  civilid: string | null = null;

  @IsPhoneNumber()
  phone: string | null = null;

  @IsEmail()
  email: string | null = null;

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
  TenantRequiredDto,
  TenantOptionalDto,
) {}

export class CreateTenantDto
  extends IntersectionType(TenantRequiredDto, PartialType(TenantOptionalDto))
  implements Partial<Tenant> {}

export class UpdateTenantDto extends PartialType(
  OmitType(CreateTenantDto, ['organizationId']),
) {}

class TenantUnitDto extends PickType(UnitDto, ['id', 'unitNumber']) {}

class TenantLeaseDto extends PartialType(LeaseDto) {
  @ApiProperty({ readOnly: true })
  unit: TenantUnitDto;
}

export class TenantOneDto extends TenantDto {
  @ApiProperty({ readOnly: true })
  leases: TenantLeaseDto[];
}
