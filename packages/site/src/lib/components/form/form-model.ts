import type { FormFields } from '$lib/components/form/form-field.interface';
import type { Entity } from '@self/utils';
import type { z } from 'zod';

export interface FormModel<T> {
	fields: FormFields<Required<T>>;
	getBlankForm: () => Partial<T>;
}

export function createFormModel<
	CreateSchema extends z.ZodTypeAny,
	UpdateSchema extends z.ZodTypeAny,
	Schemas = z.infer<CreateSchema>,
>({
	entity,
	initialFields,
	fields,
}: {
	createSchema: CreateSchema;
	updateSchema: UpdateSchema;
	entity: Entity;
	initialFields?: Partial<Schemas>;
	fields: FormFields<z.infer<CreateSchema>> & FormFields<z.infer<UpdateSchema>>;
}): FormModel<CreateSchema> {
	const getBlankForm = () => {
		return initialFields ?? {};
	};

	return {
		fields,
		getBlankForm,
	};
}
