import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { LeaseInvoice } from '@prisma/client';
import {
	LeaseInvoiceCreateManySchema,
	LeaseInvoiceCreateSchema,
	LeaseInvoiceUpdateSchema,
} from '@self/utils';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsPositive, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { Rel } from 'src/constants/rel.enum';
import { DateType } from 'src/decorators/date-type.decorator';
import { IsID } from 'src/decorators/field.decorators';

class LeaseInvoiceRequiredDto {
	@IsID()
	organizationId: string;

	@IsID()
	portfolioId: string;

	@IsPositive()
	amount: number;

	@DateType()
	postAt: Date;

	@IsID()
	leaseId: string;
}

class LeaseInvoiceOptionalDto {
	@DateType(false)
	dueAt: Date | null;

	@DateType(false)
	paidAt: Date | null;

	@IsBoolean()
	isPaid: boolean;

	@IsString()
	memo: string | null;

	// TODO replace with json field
	@IsString()
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
	implements LeaseInvoice
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
	dueAt?: string | null;
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
