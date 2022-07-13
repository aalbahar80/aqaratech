import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import {
  IsEmail,
  IsISO8601,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class PortfolioRequiredDto {
  @Nanoid()
  organizationId: string;

  @Length(1, 255)
  fullName: string;
}

class PortfolioOptionalDto {
  @IsString()
  shortName: string | null = null;

  @IsString()
  civilid: string | null = null;

  @IsPhoneNumber('KW')
  phone: string | null = null;

  @IsEmail()
  email: string | null = null;

  @IsISO8601()
  dob: Date | null = null;
}

export class PortfolioDto extends IntersectionType(
  AbstractDto,
  IntersectionType(PortfolioRequiredDto, PortfolioOptionalDto),
) {}

export class CreatePortfolioDto
  extends IntersectionType(
    PortfolioRequiredDto,
    PartialType(PortfolioOptionalDto),
  )
  implements Partial<Portfolio> {}

export class UpdatePortfolioDto extends PartialType(
  OmitType(CreatePortfolioDto, ['organizationId']),
) {}
