import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import {
  IsEmail,
  IsISO8601,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class PortfolioDto implements Portfolio {
  @ApiProperty({ readOnly: true })
  id: string;

  @ApiProperty({ readOnly: true })
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  updatedAt: Date;

  @ApiHideProperty()
  organizationId: string;

  @Length(1, 255)
  fullName: string;

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
}
