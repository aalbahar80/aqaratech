import { invalidate } from '$app/navigation';
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

			console.log('invalidating...'); // TODO: rm
			await invalidate(FilterEnum.Range);
		},

		/**
		 * Attempt to set a new range.
		 *
		 * If the range is valid, we call invalidate() to trigger a new fetch.
		 * If the range is invalid, we do nothing.
		 */
		setDates: async (start: string, end: string) => {
			try {
				const updated = DateRange.createFromDates(start, end);
				console.debug('updating range'); // TODO: rm

				set(updated);

				await invalidate(FilterEnum.Range);
			} catch (e) {
				console.debug('invalid date range'); // TODO: rm
				return;
			}
		},
	};
}

export const range = createRange();
