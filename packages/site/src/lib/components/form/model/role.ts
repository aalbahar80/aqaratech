import { createFormField } from '$lib/components/form/model/form-field';
import { createFormModel } from '$lib/components/form/model/form-model';
import { roleCreateSchema } from '@self/utils';

export const roleFormModel = () =>
	createFormModel({
		entity: 'role',

		createSchema: roleCreateSchema,
		fields: {
			email: createFormField('email', {
				required: true,
			}),
		},
	});
