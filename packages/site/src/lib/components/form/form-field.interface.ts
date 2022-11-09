import type { Option } from '$lib/models/interfaces/option.interface';

export interface BaseFormField {
	name: string;

	label: string;
	description: string;
	hint: string;
	placeholder: string;

	required: boolean;
	disabled: boolean;

	enabledInEditForm: boolean;
	enabledInCreateForm: boolean;

	// html attributes
	hintId: string;
}

// Input field

export interface InputFormField extends BaseFormField {
	type: InputType;
}

type InputType =
	| 'text'
	| 'email'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'checkbox'
	| 'radio'
	| 'file';

// Select field

export interface SelectFormField extends BaseFormField {
	type: 'select';
	options: Option[];
	combobox: boolean;
}

// Combined

export type FormField = InputFormField | SelectFormField;

export type FormFields<T> = {
	[K in keyof T]: FormField;
};
