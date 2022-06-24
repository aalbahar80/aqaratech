import {
  ApiHideProperty,
  ApiPropertyOptional,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { LeaseInvoice } from '@prisma/client';
import {
  IsBoolean,
  IsISO8601,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class LeaseInvoiceDto extends AbstractDto implements LeaseInvoice {
  @IsPositive()
  amount: number;

  @IsISO8601()
  postAt: Date;

  @IsUUID()
  leaseId: string;

  @ApiPropertyOptional()
  @IsISO8601()
  dueAt: Date | null = null;

  @ApiPropertyOptional()
  @IsISO8601()
  paidAt: Date | null = null;

  @ApiPropertyOptional()
  @IsBoolean()
  isPaid: boolean = false;

  @ApiPropertyOptional()
  @IsString()
  memo: string | null = null;

  // TODO replace with json field
  @ApiHideProperty()
  mfPaymentId: string | null;
}

export class UpdateLeaseInvoiceDto extends PartialType(
  OmitType(LeaseInvoiceDto, ['leaseId']),
) {}
