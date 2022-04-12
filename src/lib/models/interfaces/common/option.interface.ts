export interface Option {
	value: string | null | undefined;
	label: string | undefined;
}

export type SelectedOption = Option | undefined;
