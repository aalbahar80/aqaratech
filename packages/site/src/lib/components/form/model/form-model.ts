import type { EditableSchemaKeys, Entity, KeyOfSchema } from '@self/utils';

import type { FormField } from '$lib/components/form/model/form-field.interface';

import type { z } from 'zod';

export function createFormModel<
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
}) {
	return {
		entity,
		createSchema,
		updateSchema,
		fields,
	};
}
