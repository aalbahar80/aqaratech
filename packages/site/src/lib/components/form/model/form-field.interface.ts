import type { Option } from '$lib/models/interfaces/option.interface';

export interface BaseFormField<T> {
	name: T & string;

	label: string;
	description: string;
	hint: string;
	placeholder: string;

	required: boolean;
	disabled: boolean;

	hideWhenCreate: boolean;
	hideWhenEdit: boolean;

	// html attributes
	hintId: string;
}

// Input field

export interface InputFormField<T> extends BaseFormField<T> {
	type: InputType;
}

type InputType =
	| 'text'
	| 'textarea'
	| 'email'
	| 'number'
	| 'date'
	| 'datetime-local'
	| 'checkbox'
	| 'radio'
	| 'file';

// Select field

interface BaseSelectFormField<T> extends BaseFormField<T> {
	type: 'select';
	combobox: boolean;
}

interface FieldOptions {
	options: Option[];
}

export type SelectFormField<T> = BaseSelectFormField<T> & FieldOptions;

// Combined

export type FormField<T> = InputFormField<T> | SelectFormField<T>;

export type FormFields<T> = Record<keyof T, FormField<keyof T>>;

export interface FormPageModel<FieldEntries> {
	data: FieldEntries | undefined;
	fields: FormFields<FieldEntries>;
	actionData:
		| (Record<keyof FieldEntries, unknown> & {
				errors: {
					formErrors?: string[];
					fieldErrors?: Partial<Record<keyof FieldEntries, string[]>>;
				};
		  })
		| null
		| undefined;
}
