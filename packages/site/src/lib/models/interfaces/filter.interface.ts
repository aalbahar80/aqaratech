export interface Filter {
	id: string;
	label: string;
	type: FilterType;
	options: FilterOption[];
}

interface FilterOption {
	value: string;
	label: string;
	active: boolean;
	action: (event: unknown) => void;
}

export const FILTER_TYPE = {
	RADIO: 'radio',
	CHECKBOX: 'checkbox',
} as const;

export type FilterType = (typeof FILTER_TYPE)[keyof typeof FILTER_TYPE];
