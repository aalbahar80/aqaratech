import type {
	InputFormField,
	SelectFormField,
} from '$lib/components/form/form-field.interface';
import type { Object } from 'ts-toolbelt';

type WithOptions = Object.Required<Partial<SelectFormField>, 'options'> & {
	type: 'select';
};

// TODO satisfies FormField
export const createFormField = <
	T extends Partial<InputFormField> | WithOptions,
>(
	name: string,
	options?: T extends { type: 'select' }
		? WithOptions
		: Partial<InputFormField>,
) => {
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
	} as T extends { type: 'select' } ? SelectFormField : InputFormField;
};
