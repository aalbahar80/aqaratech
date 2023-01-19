import { ParsedQueryModel } from '@prisma-utils/nestjs-request-parser';
import set from 'lodash.set';
import * as R from 'remeda';

/**
 * Transform keys to dot notation.
 *
 * ```typescript
 * // original
 * { 'lease.tenantId': 'desc' }
 *
 * // transformed
 * { 'lease': { 'tenantId': 'desc' } }
 * ```
 */
export const handleSortArray = (sort: ParsedQueryModel['sort']) => {
	// Handle dot notation in sort array
	const expanded = sort.map((n) => {
		const obj = {};

		R.forEachObj.indexed(n, (val, key) => {
			if (typeof key === 'string') {
				set(obj, key, val);
			}
		});

		return obj;
	});

	return expanded;
};
