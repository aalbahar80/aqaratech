import { flatten } from '$lib/utils/flatten';
import papaparse from 'papaparse';

// Use the following papaparse import until issue is closed:
// `import papaparse from 'papaparse';`
// Issue: https://github.com/mholt/PapaParse/issues/939

/**
 * Nested objects are flattened to dot-notation.
 */
// @ts-expect-error missing index signature for type string
export const respondWithCsv = <T extends Record<unknown, unknown>[]>(
	data: T,
	filename: string,
) => {
	const flat = data.map((e) => flatten(e));
	const csv = papaparse.unparse(flat);

	return new Response(csv, {
		headers: {
			'Content-Disposition': `attachment; filename="${filename}.csv"`,
			'Content-Type': 'text/csv',
		},
	});
};
