import { ApiProperty } from '@nestjs/swagger';

interface LabelParams {
	id: string;
	title: string;
}

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

interface LabelParamsId {
	id: string;
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
