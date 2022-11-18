import { createFormField } from '$lib/components/form/model/form-field';
import {
	createFormModel,
	type FormTypeEnum,
} from '$lib/components/form/model/form-model';
import { roleCreateSchema } from '@self/utils';

export const roleFormModel = (pageType: FormTypeEnum) =>
	createFormModel({
		entity: 'role',
		pageType,
		createSchema: roleCreateSchema,
		fields: {
			email: createFormField('email', {
				required: true,
			}),
		},
	});
