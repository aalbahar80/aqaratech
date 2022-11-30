import { invalidate } from '$app/navigation';
import { defaultRange } from '$lib/components/charts/utils/date-range';
import { DateRange } from '$lib/models/classes/Range.class';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { writable } from '$lib/utils/sandboxed';
import debounce from 'debounce';

export function createRange() {
	const { subscribe, set } = writable<DateRange>(
		DateRange.createFromMonths(defaultRange),
	);

	return {
		subscribe,

		setMonths: async (months: number) => {
			set(DateRange.createFromMonths(months));

			console.log('invalidating...'); // TODO: rm
			await invalidate(FilterEnum.Range);
		},

		/**
		 * Attempt to set a new range.
		 *
		 * If the range is valid, we call invalidate() to trigger a new fetch.
		 * If the range is invalid, we do nothing.
		 */
		setDates: debounce(async (start: string, end: string) => {
			// always set the new range to keep in sync with the UI, even if date range is invalid
			set(new DateRange(start, end, null));

			// check if the range is valid, and if so, invalidate
			const parsed = DateRange.schema.safeParse({ start, end });

			if (parsed.success) {
				await invalidate(FilterEnum.Range);
			}
		}, 300),
	};
}

export const range = createRange();
