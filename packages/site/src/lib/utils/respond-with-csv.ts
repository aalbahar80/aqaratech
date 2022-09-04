import { flatten } from '$lib/utils/flatten';
import { unparse } from 'papaparse';

/**
 * Nested objects are flattened to dot-notation.
 */
export const respondWithCsv = (data: any[], filename: string) => {
	const flat = data.map((e) => flatten(e));
	const csv = unparse(flat);

	return new Response(csv, {
		headers: {
			'Content-Disposition': `attachment; filename="${filename}.csv"`,
			'Content-Type': 'text/csv',
		},
	});
};
