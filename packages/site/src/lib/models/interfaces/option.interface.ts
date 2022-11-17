export interface Option {
	value: string | number | null | undefined;
	label: string;
	disabled?: boolean;
}

export interface RelOption extends Option {
	meta?: { parentId: string };
}

export type SelectedOption = Option | undefined;

export interface RelationOptions {
	portfolio?: SelectedOption;
	property?: SelectedOption;
	unit?: SelectedOption;
	tenant?: SelectedOption;
	lease?: SelectedOption;
}
