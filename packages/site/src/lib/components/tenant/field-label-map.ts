import { tenantCreateSchema } from '@self/utils';
import { z } from 'zod';

// Rules:
// 1. only use the labels from the schema
// 2. allow us to always default to the field name if we don't have a label, aka don't force us to add a label to every field

// Note: this is a map of field names, not field db names

// Note: there is no need to alias fields in the map, since the map is only used to resolve the label from the schema, and the schema is already aliased.

/**
 * Resolves field db names to field labels for use in forms.
 */
export const getFieldLabelMap = <T extends z.AnyZodObject>(
	schema: T,
	labels?: Record<string, string>,
) => {
	const labelMap: Record<string, string> = {};
	// const sample = z.object({ a: z.string(), b: z.string() });

	// Extract field names from schema

	const keys = Object.keys(schema.shape);
	console.log({ keys });
	// const keys = schema.keyof();

	// Iterate over field names:
	//  - If the field has a custom label, use it
	//  - Otherwise, default to the field name

	for (const key of keys) {
		const label = labels?.[key] ?? key;
		labelMap[key] = label;
	}

	return labelMap;
};

const tenantFieldLabelMap = getFieldLabelMap(tenantCreateSchema, {
	phone: 'Phone Number',
	a: 'b',
});
console.log({ tenantFieldLabelMap }, 'field-label-map.ts ~ 41');
