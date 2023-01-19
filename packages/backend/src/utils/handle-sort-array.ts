import { ParsedQueryModel } from '@prisma-utils/nestjs-request-parser';
import set from 'lodash.set';
import * as R from 'remeda';

/**
 * Transform keys to dot notation. Add an id tiebreaker.
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
	const final: Record<string, unknown>[] = [];

	// Handle dot notation in sort array
	sort.forEach((n) => {
		// Handle dot notation for the requested key
		R.forEachObj.indexed(n, (val, key) => {
			if (typeof key === 'string') {
				const obj = {};
				set(obj, key, val);
				final.push(obj);
			}
		});

		// Add an id tiebreaker, where id is a sibling of the requested key
		// e.g. [{ 'lease.tenantId': 'desc' }] => [{ 'lease': { 'tenantId': 'desc' } }, { 'lease': { 'id': 'desc' } }]

		R.forEachObj.indexed(n, (val, key) => {
			if (typeof key === 'string') {
				const withoutLast = key.split('.').slice(0, -1).join('.');

				const keyIsRoot = withoutLast === '';

				// If the key at the root level, add an id tiebreaker
				if (keyIsRoot) {
					final.push({ id: 'desc' });
				} else {
					// Otherwise if the key is not at the root level,
					// add an id tiebreaker at the same level as the requested key
					const tiebreaker = {};
					set(tiebreaker, withoutLast, { id: val });
					final.push(tiebreaker);
				}
			}
		});
	});

	return final;
};
