import {
	ApiHideProperty,
	ApiProperty,
	IntersectionType,
	OmitType,
	PartialType,
	PickType,
} from '@nestjs/swagger';
import { Lease } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

import { LeaseCreateSchema, LeaseUpdateSchema } from '@self/utils';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import {
	BreadcrumbDto,
	BreadcrumbsDto,
	IBreadcrumbs,
} from 'src/common/dto/breadcrumb.dto';
import { NonComputed } from 'src/types/common.types';

class LeaseRequiredDto {
	organizationId: string;

	portfolioId: string;

	tenantId: string;

	unitId: string;

	start: Date;

	end: Date;

	monthlyRent: number;
}

class LeaseOptionalDto {
	deposit: number;

	canPay: boolean;

	notify: boolean;

	license: string | null;
}

class LeaseBreadcrumbsDto extends PickType(BreadcrumbsDto, [
	'tenant',
	'portfolio',
	'property',
	'unit',
]) {}

export class LeaseDto
	extends IntersectionType(
		AbstractDto,
		IntersectionType(LeaseRequiredDto, LeaseOptionalDto),
	)
	implements Lease
{
	constructor(data: NonComputed<LeaseDto>) {
		super();
		Object.assign(this, data);
	}

	@ApiHideProperty()
	@Exclude()
	tenant: IBreadcrumbs['tenant'];

	@ApiHideProperty()
	@Exclude()
	unit: IBreadcrumbs['unit'];

	@ApiProperty()
	@Expose()
	get breadcrumbs(): LeaseBreadcrumbsDto {
		return {
			portfolio: new BreadcrumbDto({
				id: this.portfolioId,
				title: this.unit.property.portfolio.title,
			}),
			property: new BreadcrumbDto({
				id: this.unit.property.id,
				title: this.unit.property.title,
			}),
			unit: new BreadcrumbDto({
				id: this.unit.id,
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				title: this.unit.computed!.title,
			}),
			tenant: new BreadcrumbDto({
				id: this.tenant.id,
				title: this.tenant.title,
			}),
		};
	}
}

export class CreateLeaseDto implements LeaseCreateSchema {
	portfolioId: string;
	unitId: string;
	tenantId: string;
	start: string;
	monthlyRent: number;
	deposit: number;
	end: string;
	notify: boolean;
	canPay: boolean;
	license?: string | null;
}

export class UpdateLeaseDto
	extends PartialType(
		OmitType(CreateLeaseDto, ['portfolioId', 'unitId', 'tenantId']),
	)
	implements LeaseUpdateSchema {}
