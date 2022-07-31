import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { Portfolio } from '@prisma/client';
import { IsPhoneNumber, IsString, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { DateType } from 'src/decorators/date-type.decorator';
import { Nanoid } from 'src/decorators/field.decorators';

class PortfolioRequiredDto {
  @Nanoid()
  organizationId: string;

  @Length(1, 255)
  fullName: string;
}

class PortfolioOptionalDto {
  @IsString()
  label: string | null;

  @IsString()
  civilid: string | null;

  @IsPhoneNumber('KW')
  phone: string | null;

  @DateType(false)
  dob: Date | null;
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
