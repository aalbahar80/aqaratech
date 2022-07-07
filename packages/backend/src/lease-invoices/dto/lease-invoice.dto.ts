import {
  ApiHideProperty,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { LeaseInvoice } from '@prisma/client';
import { IsBoolean, IsISO8601, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class LeaseInvoiceRequiredDto {
  @IsPositive()
  amount: number;

  @IsISO8601()
  postAt: Date;

  @Nanoid()
  leaseId: string;
}

class LeaseInvoiceOptionalDto {
  @IsISO8601()
  dueAt: Date | null = null;

  @IsISO8601()
  paidAt: Date | null = null;

  @IsBoolean()
  isPaid: boolean = false;

  @IsString()
  memo: string | null = null;

  // TODO replace with json field
  @ApiHideProperty()
  mfPaymentId: string | null;
}

export class LeaseInvoiceBasicDto extends IntersectionType(
  LeaseInvoiceRequiredDto,
  LeaseInvoiceOptionalDto,
) {}

export class LeaseInvoiceDto extends IntersectionType(
  AbstractDto,
  LeaseInvoiceBasicDto,
) {
  breadcrumbs: LeaseInvoiceBreadcrumbsDto;
}

export class CreateLeaseInvoiceDto
  extends IntersectionType(
    LeaseInvoiceRequiredDto,
    PartialType(LeaseInvoiceOptionalDto),
  )
  implements Partial<LeaseInvoice> {}

export class UpdateLeaseInvoiceDto extends PartialType(
  OmitType(CreateLeaseInvoiceDto, ['leaseId']),
) {}

export class LeaseInvoiceBreadcrumbsDto extends PickType(BreadcrumbsDto, [
  'tenant',
  'portfolio',
  'property',
  'unit',
  'lease',
]) {}
