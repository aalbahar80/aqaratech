import {
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { LeaseInvoice } from '@prisma/client';
import { IsBoolean, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { DateType } from 'src/decorators/date-type.decorator';
import { Nanoid } from 'src/decorators/field.decorators';

class LeaseInvoiceRequiredDto {
  @IsPositive()
  amount: number;

  @DateType()
  postAt: Date;

  @Nanoid()
  leaseId: string;
}

class LeaseInvoiceOptionalDto {
  @DateType()
  dueAt: Date | null;

  @DateType()
  paidAt: Date | null;

  @IsBoolean()
  isPaid: boolean;

  @IsString()
  memo: string | null;

  // TODO replace with json field
  @IsString()
  mfPaymentId: string | null;
}

export class LeaseInvoiceBasicDto extends IntersectionType(
  AbstractDto,
  IntersectionType(LeaseInvoiceRequiredDto, LeaseInvoiceOptionalDto),
) {}

export class LeaseInvoiceDto extends LeaseInvoiceBasicDto {
  breadcrumbs: LeaseInvoiceBreadcrumbsDto;
}

export class CreateLeaseInvoiceDto
  extends IntersectionType(
    LeaseInvoiceRequiredDto,
    PartialType(LeaseInvoiceOptionalDto),
  )
  implements Partial<LeaseInvoice> {}

export class CreateManyLeaseInvoicesDto extends OmitType(
  CreateLeaseInvoiceDto,
  ['leaseId'],
) {}

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
