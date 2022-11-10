import type {
	InputFormField,
	SelectFormField,
} from '$lib/components/form/form-field.interface';
import type { Option } from '$lib/models/interfaces/option.interface';
import { getLabel } from '@self/utils';

type WithOptions<Name> = {
	type: 'select';
	options: Option[];
} & Partial<SelectFormField<Name>>;

type WithoutOptions<Name> = Partial<InputFormField<Name>>;

// TODO satisfies FormField
export const createFormField = <
	Name extends string,
	T extends WithOptions<Name> | WithoutOptions<Name>,
>(
	name: Name,
	options?: T extends WithOptions<Name>
		? WithOptions<Name>
		: WithoutOptions<Name>,
) => {
	return {
		name,
		type: 'text',

		label: getLabel(name),
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
