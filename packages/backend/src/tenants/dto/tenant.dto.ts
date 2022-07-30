import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Tenant } from '@prisma/client';
import {
  IsISO31661Alpha3,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { DateType } from 'src/decorators/date-type.decorator';
import { Nanoid } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';

export class TenantDto extends AbstractDto {
  @Nanoid()
  organizationId: string;

  @Length(1, 255)
  fullName: string;

  @IsString()
  label?: string | null;

  @IsString()
  civilid?: string | null;

  @IsPhoneNumber('KW')
  phone?: string | null;

  @DateType(false)
  dob?: Date | null;

  @IsString()
  passportNum?: string | null;

  @IsISO31661Alpha3()
  nationality?: string | null;

  @IsString()
  residencyNum?: string | null;

  @DateType(false)
  residencyEnd?: Date | null;
}

export class CreateTenantDto
  extends OmitType(TenantDto, ['id', 'createdAt', 'updatedAt'])
  implements Partial<Tenant> {}

export class UpdateTenantDto extends PartialType(
  OmitType(CreateTenantDto, ['organizationId']),
) {}

class TenantLeaseDto extends PartialType(LeaseDto) {}

export class TenantOneDto extends TenantDto {
  @ApiProperty({ readOnly: true })
  leases: TenantLeaseDto[];
}
