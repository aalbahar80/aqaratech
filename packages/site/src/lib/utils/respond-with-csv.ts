import { flatten } from '$lib/utils/flatten';
// import * as Papa from 'papaparse';
// @ts-expect-error minified version has no types
import pkg from 'papaparse/papaparse.min.js';
const { unparse } = pkg;

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
