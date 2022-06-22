import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
} from '@nestjs/swagger';
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
}

export class UpdatePortfolioDto extends PartialType(PortfolioDto) {}
