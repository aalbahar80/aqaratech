import { ApiProperty } from '@nestjs/swagger';

interface LabelParams {
	id: string;
	title: string;
}

type LabelParamsId = Omit<LabelParams, 'title'>;

export interface IBreadcrumbs {
	tenant: LabelParams;
	portfolio: LabelParams;
	property: LabelParams & { portfolio: LabelParams };
	unit: LabelParams & {
		property: LabelParams & { portfolio: LabelParams };
	};
	lease: LabelParamsId & {
		tenant: LabelParams;
		unit: LabelParams & {
			property: LabelParams & { portfolio: LabelParams };
		};
	};
}

export class BreadcrumbDto {
	@ApiProperty()
	id: string;

	@ApiProperty()
	label: string;

	constructor(labelParams: LabelParams) {
		this.id = labelParams.id;
		this.label = labelParams.title;
	}
}

export class BreadcrumbsDto {
	tenant: BreadcrumbDto;

	portfolio: BreadcrumbDto;

	property: BreadcrumbDto;

	unit: BreadcrumbDto;

	lease: BreadcrumbDto;
}
