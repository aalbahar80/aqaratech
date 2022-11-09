import type { FormField } from '$lib/components/form/form-field.interface';

// TODO satisfies FormField
export const createFormField = (name: string, options?: Partial<FormField>) => {
	return {
		name,
		type: 'text',

		label: name,
		description: '',
		hint: '',
		placeholder: '',

		required: false,
		disabled: false,

		enabledInCreateForm: true,
		enabledInEditForm: true,

		// html attributes
		hintId: `${name}-hint`,

		...options,
	};
};
