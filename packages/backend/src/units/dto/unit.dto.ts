import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Unit } from '@prisma/client';
import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';
import { LeaseDto } from 'src/leases/dto/lease.dto';

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

  @ApiProperty({ readOnly: true }) // needed?
  leases?: LeaseDto[];
}

export class UnitDto extends IntersectionType(
  UnitRequiredDto,
  UnitOptionalDto,
) {}

export class CreateUnitDto
  extends IntersectionType(
    UnitRequiredDto,
    PartialType(OmitType(UnitOptionalDto, ['leases'])),
  )
  implements Partial<Unit> {}

export class UpdateUnitDto extends PartialType(
  OmitType(CreateUnitDto, ['propertyId']),
) {}
