import type { Option } from '$lib/models/interfaces/option.interface';

export interface BaseFormField<T extends string> {
	name: T;

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

export interface InputFormField<T extends string> extends BaseFormField<T> {
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

export interface SelectFormField<T extends string> extends BaseFormField<T> {
	type: 'select';
	options: Option[];
	combobox: boolean;
}

// Combined

export type FormField<T extends string> =
	| InputFormField<T>
	| SelectFormField<T>;

export type FormFields<T> = {
	[K in keyof T]: K extends string ? FormField<K> : never;
};
