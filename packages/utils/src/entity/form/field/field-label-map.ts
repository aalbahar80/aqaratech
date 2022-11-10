import type { z } from 'zod';

type SomeRecord = Record<string, unknown>;
type WithShape = z.ZodType<SomeRecord> & {
	shape: SomeRecord;
};
type GetShape<T extends WithShape> = T['shape'];

/**
 * Resolves field labels for use in forms.
 */
export const getFieldLabelMap = <T extends WithShape>(
	schema: T,
	labels?: Partial<Record<keyof GetShape<T>, string>>,
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
