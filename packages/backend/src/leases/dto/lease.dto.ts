import { ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import { Lease } from '@prisma/client';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class LeaseDto extends AbstractDto implements Lease {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  unitId: string;

  @IsISO8601()
  start: Date;

  @IsISO8601()
  end: Date;

  @IsPositive()
  monthlyRent: number;

  @ApiPropertyOptional()
  @IsNumber()
  deposit: number = 0;

  @ApiPropertyOptional()
  @IsBoolean()
  deactivated: boolean = false;

  @ApiPropertyOptional()
  @IsBoolean()
  notify: boolean = true;

  @ApiPropertyOptional()
  @IsString()
  license: string | null = null;
}

export class UpdateLeaseDto extends PartialType(
  OmitType(LeaseDto, ['tenantId', 'unitId']),
) {}
