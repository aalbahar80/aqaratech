import debounce from 'debounce';

import { invalidate } from '$app/navigation';
import type { RangeKind } from '@self/utils';

import { defaultRange } from '$lib/components/charts/utils/date-range';
import { DateRange } from '$lib/models/classes/Range.class';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { writable } from '$lib/utils/sandboxed';

export function createRange() {
	const { subscribe, set } = writable<DateRange>(
		DateRange.createFromMonths(defaultRange),
	);

	return {
		subscribe,

		setMonths: async (months: number) => {
			set(DateRange.createFromMonths(months));

			await invalidate(FilterEnum.Range);
		},

		/**
		 * Attempt to set a new range.
		 *
		 * If the range is valid, we call invalidate() to trigger a new fetch.
		 * If the range is invalid, we do nothing.
		 */
		setDates: (start: string, end: string) => {
			// always set the new range to keep in sync with the UI, even if date range is invalid
			set(new DateRange(start, end, null));

			// check if the range is valid, and if so, invalidate
			const parsed = DateRange.schema.safeParse({ start, end });

			if (parsed.success) {
				// debouncedInvalidate() will return undefined the first time it's
				// called so we add nullish coalescing to prevent an error
				debouncedInvalidate()?.catch((error) => {
					console.error(error);
				});
			} else {
				console.warn('Invalid date range');
			}
		},
	};
}

export const range = createRange();

const debouncedInvalidate = debounce(async () => {
	await invalidate(FilterEnum.Range);
}, 150);

// range kind
export const rangeKind = writable<RangeKind>('postAt');
