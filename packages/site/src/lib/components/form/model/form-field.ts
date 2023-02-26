import type {
	InputFormField,
	SelectFormField,
} from '$lib/components/form/model/form-field.interface';
import type { Option } from '$lib/models/interfaces/option.interface';

import { getIntlLabel } from '$lib/i18n/get-intl-label';

type WithOptions<Name extends string> = {
	type: 'select';
	options?: Option[];
} & Partial<SelectFormField<Name>>;

type WithoutOptions<Name extends string> = Partial<InputFormField<Name>>;

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

		label: getIntlLabel(name),
		description: '',
		hint: '',
		placeholder: '',

		required: false,
		disabled: false,

		hideWhenCreate: false,
		hideWhenEdit: false,

		// html attributes
		hintId: `${name}-hint`,

		...options,
	} as SelectFormField<Name> | InputFormField<Name>;
};
