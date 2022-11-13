import type { Option } from '$lib/models/interfaces/option.interface';

export interface BaseFormField<T> {
	name: T & string;

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

export interface InputFormField<T> extends BaseFormField<T> {
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

export interface SelectFormField<T> extends BaseFormField<T> {
	type: 'select';
	options: Option[];
	combobox: boolean;
}

// Combined

export type FormField<T> = InputFormField<T> | SelectFormField<T>;

export type FormFields<T> = Record<keyof T, FormField<keyof T>>;

export interface FormPageModel<FieldEntries> {
	data: FieldEntries;
	fields: FormFields<FieldEntries>;
	actionData:
		| (Record<keyof FieldEntries, unknown> & {
				errors: {
					formErrors?: string[];
					fieldErrors?: Partial<Record<keyof FieldEntries, string[]>>;
				};
		  })
		| undefined;
}
