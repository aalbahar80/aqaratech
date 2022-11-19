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
	ExcludedFields extends
		| KeyOfSchema<CreateSchema>[]
		| KeyOfSchema<UpdateSchema>[] = [],
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
	/**
	 * Fields that will not be included in the form.
	 */
	excludedFields?: ExcludedFields;
	fields: Omit<
		{
			[K in EditableSchemaKeys<KeyOfSchema<CreateSchema>>]: FormField<K>;
		},
		ExcludedFields[number]
	>;
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
