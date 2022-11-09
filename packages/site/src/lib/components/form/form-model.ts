import type { FormFields } from '$lib/components/form/form-field.interface';
import type { Entity, PageType } from '@self/utils';
import type { z } from 'zod';

export type FormTypeEnum = PageType.Edit | PageType.New;

export interface FormModel<
	FormType extends PageType.New | PageType.Edit,
	CreateSchema extends z.ZodTypeAny,
	UpdateSchema extends z.ZodTypeAny,
	Schema = FormType extends PageType.New ? CreateSchema : UpdateSchema,
> {
	entity: Entity;
	createSchema: CreateSchema;
	updateSchema: UpdateSchema;
	fields: FormFields<Required<Schema>>;
	pageType: FormType;
	getBlankForm: () => Partial<Schema>;
}

export function createFormModel<
	FormType extends PageType.New | PageType.Edit,
	CreateSchema extends z.ZodTypeAny,
	UpdateSchema extends z.ZodTypeAny,
	CombinedSchemas = z.infer<CreateSchema>,
>({
	entity,
	createSchema,
	updateSchema,
	initialFields,
	fields,
	pageType,
}: {
	createSchema: CreateSchema;
	updateSchema: UpdateSchema;
	entity: Entity;
	initialFields?: Partial<CombinedSchemas>;
	// fields: FormFields<z.infer<CreateSchema>> & FormFields<z.infer<UpdateSchema>>;
	fields: FormType extends PageType.New
		? FormFields<z.infer<CreateSchema>>
		: FormFields<z.infer<UpdateSchema>>;
	pageType: FormType;
}): FormModel<FormType, CreateSchema, UpdateSchema> {
	const getBlankForm = () => {
		return initialFields ?? {};
	};

	return {
		pageType,
		entity,
		createSchema,
		updateSchema,
		fields,
		getBlankForm,
	};
}
