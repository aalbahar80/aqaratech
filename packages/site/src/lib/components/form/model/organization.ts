import { organizationSchema } from '@self/utils';

import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { labelHint } from '$lib/constants/form-hints';

export const organizationFormModel = () =>
	createFormModel({
		entity: 'organization',

		createSchema: organizationSchema,
		updateSchema: organizationSchema,
		fields: {
			fullName: createFormField('fullName', {
				required: true,
			}),

			label: createFormField('label', {
				hint: labelHint(),
			}),
		},
	});
