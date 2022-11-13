import type { FormFields } from '$lib/components/form/model/form-field.interface';
import type { Entity, PageType } from '@self/utils';
import type { z } from 'zod';

export type FormTypeEnum = PageType.Edit | PageType.New;

export function createFormModel<
	FormType extends PageType.New | PageType.Edit,
	CreateSchema extends z.ZodTypeAny,
	UpdateSchema extends z.ZodTypeAny,
>({
	entity,
	createSchema,
	updateSchema,
	fields,
	pageType,
}: {
	createSchema: CreateSchema;
	updateSchema?: UpdateSchema;
	entity: Entity;
	fields: FormType extends PageType.New
		? FormFields<z.infer<CreateSchema>>
		: FormFields<z.infer<UpdateSchema>>;
	pageType: FormType;
}) {
	return {
		pageType,
		entity,
		createSchema,
		updateSchema,
		fields,
	};
}
