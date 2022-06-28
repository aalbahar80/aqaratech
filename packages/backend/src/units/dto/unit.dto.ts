import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class UnitRequiredDto extends AbstractDto {
  @Nanoid()
  propertyId: string;

  @Length(1, 255)
  unitNumber: string;
}

class UnitOptionalDto {
  @IsNumber()
  floor: number | null = null;

  @IsPositive()
  size: number | null = null;

  @IsPositive()
  bed: number | null = null;

  @IsPositive()
  bath: number | null = null;

  @IsPositive()
  marketRent: number | null = null;

  @IsString()
  type: string | null = null;

  @IsString()
  usage: string | null = null;
}

export class UnitDto extends IntersectionType(
  UnitRequiredDto,
  UnitOptionalDto,
) {}

export class CreateUnitDto
  extends IntersectionType(UnitRequiredDto, PartialType(UnitOptionalDto))
  implements Partial<Unit> {}

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['propertyId']),
) {}

export class UnitVacancyDto extends UnitDto {
  @IsBoolean()
  isVacant: boolean;

  @IsString()
  vacancyDistance: string | undefined;

  @IsISO8601()
  vacancy: Date | undefined;
}
