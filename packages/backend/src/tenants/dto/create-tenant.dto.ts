import {
  IsEmail,
  IsString,
  IsUUID,
  MinLength,
  MaxLength,
  IsDate,
  IsISO31661Alpha3,
  IsISO8601,
} from 'class-validator';

export class CreateTenantDto {
  @IsUUID()
  id: string;

  @IsString()
  fullName: string;

  @IsString()
  shortName?: string;

  @IsEmail()
  email?: string;

  @IsUUID()
  orgId: string;

  @IsString()
  @MinLength(12)
  @MaxLength(12)
  civilid?: string;

  @IsDate()
  dob?: Date;

  @IsString()
  passportNum?: string;

  @IsISO31661Alpha3()
  nationality?: string;

  @IsISO8601()
  residencyEnd?: string;

  //   @IsString()
  //   contactMethod?: string;
}
