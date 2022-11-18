import type { FormField } from '$lib/components/form/model/form-field.interface';
import type {
	EditableSchemaKeys,
	Entity,
	KeyOfSchema,
	PageType,
} from '@self/utils';
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
	fields: {
		[K in EditableSchemaKeys<KeyOfSchema<CreateSchema>>]: FormField<K>;
	};
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
