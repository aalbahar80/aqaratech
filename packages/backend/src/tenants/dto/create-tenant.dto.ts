import {
  IsEmail,
  IsISO31661Alpha3,
  IsISO8601,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateTenantDto {
  // @IsUUID()
  // id: string;

  @IsString()
  fullName: string;

  @IsString()
  shortName?: string;

  @IsEmail()
  email?: string;

  @IsUUID()
  orgId: string;

  @IsString()
  @Length(12, 12)
  civilid?: string;

  @IsISO8601()
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
