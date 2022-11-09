import type {
	InputFormField,
	SelectFormField,
} from '$lib/components/form/form-field.interface';
import type { Option } from '$lib/models/interfaces/option.interface';

interface WithOptions {
	type: 'select';
	options: Option[];
	combobox?: boolean;
}

type WithoutOptions = Partial<InputFormField>;

// TODO satisfies FormField
export const createFormField = <T extends WithOptions | WithoutOptions>(
	name: string,
	options?: T extends WithOptions ? WithOptions : WithoutOptions,
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
	} as T extends WithOptions ? SelectFormField : InputFormField;
};
