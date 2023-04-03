import { ApiProperty } from '@nestjs/swagger';

interface LabelParams {
	id: string;
	title: string;
}

/** For models where we get the title from the underlying db view "computed". */
interface LabelComputedParams {
	id: string;
	computed: {
		title: string;
	} | null;
}

type LabelParamsId = Omit<LabelParams, 'title'>;

export interface IBreadcrumbs {
	tenant: LabelParams;
	portfolio: LabelParams;
	property: LabelParams & { portfolio: LabelParams };
	unit: LabelComputedParams & {
		property: LabelParams & { portfolio: LabelParams };
	};
	lease: LabelParamsId & {
		tenant: LabelParams;
		unit: LabelComputedParams & {
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
