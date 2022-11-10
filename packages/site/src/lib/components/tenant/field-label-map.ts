import { tenantCreateSchema } from '@self/utils';
import type { z } from 'zod';

/**
 * Resolves field labels for use in forms.
 */
export const getFieldLabelMap = <T extends z.AnyZodObject>(
	schema: T,
	labels?: Partial<Record<KeysOfSchema<T>, string>>,
) => {
	// Extract field names from schema

	const keys = Object.keys(schema.shape);

	// Iterate over field names:
	//  - If the field has a custom label, use it
	//  - Otherwise, default to the field name

	const labelMap: Record<string, string> = {};

	for (const key of keys) {
		const label = labels?.[key] ?? key;
		labelMap[key] = label;
	}

	return labelMap;
};

const tenantFieldLabelMap = getFieldLabelMap(tenantCreateSchema, {
	phone: 'Phone Number',
});

console.log({ tenantFieldLabelMap }, 'field-label-map.ts ~ 41');

type KeysOfSchema<T extends z.AnyZodObject> = keyof T['shape'];
