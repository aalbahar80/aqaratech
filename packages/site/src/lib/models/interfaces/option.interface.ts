export interface Option {
	value: string | undefined;
	label: string | undefined;
}

export type SelectedOption = Option | undefined;

export interface RelationOptions {
	client?: SelectedOption;
	property?: SelectedOption;
	unit?: SelectedOption;
	tenant?: SelectedOption;
	lease?: SelectedOption;
}