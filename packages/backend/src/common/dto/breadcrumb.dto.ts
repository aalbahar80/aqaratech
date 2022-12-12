import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

import { computeLabelProperty, computeLabelUnit } from '@self/utils';

import { Rel } from 'src/constants/rel.enum';

export interface IBreadcrumbs {
	tenant: TenantLabelParams;
	portfolio: PortfolioLabelParams;
	property: PropertyLabelParams & { portfolio: PortfolioLabelParams };
	unit: UnitLabelParams & {
		property: PropertyLabelParams & { portfolio: PortfolioLabelParams };
	};
	lease: LeaseLabelParams & {
		tenant: TenantLabelParams;
		unit: UnitLabelParams & {
			property: PropertyLabelParams & { portfolio: PortfolioLabelParams };
		};
	};
}

export interface TenantLabelParams {
	id: string;
	label: string | null;
	fullName: string;
}
export interface PortfolioLabelParams {
	id: string;
	label: string | null;
	fullName: string;
}
export interface PropertyLabelParams {
	id: string;
	label: string | null;
	area: string | null;
	block: string | null;
	number: string | null;
}
export interface UnitLabelParams {
	id: string;
	label: string | null;
	type: string | null;
	unitNumber: string;
}
interface LeaseLabelParams {
	id: string;
}
interface MOParams {
	id: string;
}

type BreadcrumbDtoParameters =
	| (TenantLabelParams & { rel: Rel.Tenant })
	| (PortfolioLabelParams & { rel: Rel.Portfolio })
	| (PropertyLabelParams & { rel: Rel.Property })
	| (UnitLabelParams & { rel: Rel.Unit })
	| (LeaseLabelParams & { rel: Rel.Lease })
	| (MOParams & { rel: Rel.MaintenanceOrder });

// interface BreadcrumbDtoParameters {
//   labelParams: LabelParams;
// }

export class BreadcrumbDto {
	@ApiHideProperty()
	rel: Rel;

	@ApiProperty()
	id: string;

	@ApiProperty()
	label: string;

	constructor(labelParams: BreadcrumbDtoParameters) {
		const { rel, id } = labelParams;
		this.id = id;

		if (rel === Rel.Tenant) {
			this.label = labelParams.label ?? labelParams.fullName;
		} else if (rel === Rel.Portfolio) {
			this.label = labelParams.label ?? labelParams.fullName;
		} else if (rel === Rel.Property) {
			this.label = labelParams.label ?? computeLabelProperty(labelParams);
		} else if (rel === Rel.Unit) {
			this.label = labelParams.label ?? computeLabelUnit(labelParams);
		} else if (rel === Rel.Lease) {
			this.label = labelParams.id;
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		} else if (rel === Rel.MaintenanceOrder) {
			this.label = labelParams.id;
		}
	}
}

export class BreadcrumbsDto {
	// @ApiProperty({ readOnly: true })
	tenant: BreadcrumbDto;

	@ApiProperty({ readOnly: true })
	portfolio: BreadcrumbDto;

	@ApiProperty({ readOnly: true })
	property: BreadcrumbDto;

	@ApiProperty({ readOnly: true })
	unit: BreadcrumbDto;

	@ApiProperty({ readOnly: true })
	lease: BreadcrumbDto;
}
