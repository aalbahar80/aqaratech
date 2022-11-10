import type { z } from 'zod';

type SomeRecord = Record<string, unknown>;
type WithShape = z.ZodType<SomeRecord> & {
	shape: SomeRecord;
};

// Source: https://fettblog.eu/typescript-union-to-intersection/
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
	x: infer R,
) => any
	? R
	: never;

/**
 * Resolves field labels for use in forms.
 */
export const getFieldLabelMap = <T extends WithShape>(
	schemas: T[],
	labels?: Partial<Record<keyof UnionToIntersection<T['shape']>, string>>,
) => {
	// Extract field names from schemas

	const keys = getUniquesSchemaKeys(...schemas);

	// Iterate over field names:
	//  - If the field has a custom label, use it
	//  - Otherwise, default to the field name

	const labelMap: Record<string, string> = {};

	for (const key of keys) {
		// @ts-expect-error generic
		const label = labels?.[key] ?? key;
		labelMap[key] = label;
	}

	return labelMap;
};

const getSchemaKeys = <T extends WithShape>(schema: T) =>
	Object.keys(schema.shape);

const getUniquesSchemaKeys = <T extends WithShape>(...schemas: T[]) => {
	const keys = schemas.map(getSchemaKeys);
	const uniques = new Set(keys.flat());
	return Array.from(uniques);
};
