import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { HateoasDto } from 'src/common/dto/hateoas.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class UnitRequiredDto {
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

// InputDtos

export class CreateUnitDto
  extends IntersectionType(UnitRequiredDto, PartialType(UnitOptionalDto))
  implements Partial<Unit> {}

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['propertyId']),
) {}

// OutputDtos

export class UnitBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'portfolio',
  'property',
]) {}

export class UnitVacancy {
  isVacant: boolean;
  vacancyDistance: string | null;
  vacancyDate: Date | null;
}

export class UnitDto extends IntersectionType(
  AbstractDto,
  IntersectionType(UnitRequiredDto, UnitOptionalDto),
) {
  hateoas: HateoasDto;
  breadcrumbs?: UnitBreadcrumbsDto;
  vacancy?: UnitVacancy;
}
