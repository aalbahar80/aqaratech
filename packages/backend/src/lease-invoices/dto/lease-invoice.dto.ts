import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { LeaseInvoice } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import {
	LeaseInvoiceCreateManySchema,
	LeaseInvoiceCreateSchema,
	LeaseInvoiceUpdateSchema,
} from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';

class LeaseInvoiceRequiredDto {
	organizationId: string;

	portfolioId: string;

	amount: number;

	postAt: Date;

	leaseId: string;
}

class LeaseInvoiceOptionalDto {
	dueAt: Date | null;

	paidAt: Date | null;

	isPaid: boolean;

	memo: string | null;

	mfPaymentId: string | null;
}

class LeaseInvoiceBreadcrumbsDto extends PickType(BreadcrumbsDto, [
	'tenant',
	'portfolio',
	'property',
	'unit',
	'lease',
]) {}

export class LeaseInvoiceDto
	extends IntersectionType(
		AbstractDto,
		IntersectionType(LeaseInvoiceRequiredDto, LeaseInvoiceOptionalDto),
	)
	implements Omit<LeaseInvoice, 'mfData'>
{
	constructor(partial: Partial<LeaseInvoiceDto>) {
		super();
		Object.assign(this, partial);
	}

	@ApiHideProperty()
	@Exclude()
	lease: IBreadcrumbs['lease'];

	@ApiProperty()
	@Expose()
	get breadcrumbs(): LeaseInvoiceBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				rel: Rel.Portfolio,
				...this.lease.unit.property.portfolio,
			}),
			property: new BreadcrumbDto({
				rel: Rel.Property,
				...this.lease.unit.property,
			}),
			unit: new BreadcrumbDto({
				rel: Rel.Unit,
				...this.lease.unit,
			}),
			tenant: new BreadcrumbDto({
				rel: Rel.Tenant,
				...this.lease.tenant,
			}),
			lease: new BreadcrumbDto({
				rel: Rel.Lease,
				...this.lease,
			}),
		};
	}
}

export class PartialLeaseInvoiceDto extends PartialType(LeaseInvoiceDto) {}

export class CreateLeaseInvoiceDto implements LeaseInvoiceCreateSchema {
	portfolioId: string;
	leaseId: string;
	amount: number;
	isPaid: boolean;
	postAt: string;
	paidAt?: string | null;
	memo?: string | null;
}

export class UpdateLeaseInvoiceDto
	extends PartialType(
		OmitType(CreateLeaseInvoiceDto, ['portfolioId', 'leaseId']),
	)
	implements LeaseInvoiceUpdateSchema {}

export class CreateManyLeaseInvoicesDto
	extends OmitType(CreateLeaseInvoiceDto, ['leaseId'])
	implements LeaseInvoiceCreateManySchema {}
