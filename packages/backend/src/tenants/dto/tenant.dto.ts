import {
  ApiHideProperty,
  ApiPropertyOptional,
  PartialType,
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

export class TenantDto extends AbstractDto implements Tenant {
  @ApiHideProperty()
  organizationId: string;

  @Length(1, 255)
  fullName: string;

  @ApiPropertyOptional()
  @IsString()
  shortName: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  civilid: string | null = null;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  phone: string | null = null;

  @ApiPropertyOptional()
  @IsEmail()
  email: string | null = null;

  @ApiPropertyOptional()
  @IsISO8601()
  dob: Date | null = null;

  @ApiPropertyOptional()
  @IsString()
  passportNum: string | null = null;

  @ApiPropertyOptional()
  @IsISO31661Alpha3()
  nationality: string | null = null;

  @ApiPropertyOptional()
  @IsString()
  residencyNum: string | null = null;

  @ApiPropertyOptional()
  @IsISO8601()
  residencyEnd: Date | null = null;

  // TODO remove
  @ApiHideProperty()
  contactMethod: string | null = null;
}

export class UpdateTenantDto extends PartialType(TenantDto) {}
