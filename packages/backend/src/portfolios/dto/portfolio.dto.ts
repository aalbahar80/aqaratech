import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import {
  IsEmail,
  IsISO8601,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class PortfolioDto extends AbstractDto implements Portfolio {
  @IsUUID()
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

export class UpdatePortfolioDto extends PartialType(
  OmitType(PortfolioDto, ['organizationId']),
) {}
