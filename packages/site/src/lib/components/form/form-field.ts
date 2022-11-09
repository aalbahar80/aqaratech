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

type WithoutOptions<Name> = Partial<InputFormField<Name>>;

// TODO satisfies FormField
export const createFormField = <
	Name extends string,
	T extends WithOptions | WithoutOptions<Name>,
>(
	name: Name,
	options?: T extends WithOptions ? WithOptions : WithoutOptions<Name>,
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
	} as SelectFormField<Name> | InputFormField<Name>;
};
