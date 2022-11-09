export interface FormField {
	name: string;
	type: string;

	label: string;
	description: string;
	hint: string;

	required: boolean;
	disabled: boolean;

	enabledInEditForm: boolean;
	enabledInCreateForm: boolean;
}

export type FormFields<T> = {
	[K in keyof T]: FormField;
};

export const createFormField = (
	name: string,
	options?: Partial<FormField>,
): FormField => {
	return {
		name,
		type: 'text',

		label: name,
		description: '',
		hint: '',

		required: false,
		disabled: false,

		enabledInCreateForm: true,
		enabledInEditForm: true,

		...options,
	};
};
