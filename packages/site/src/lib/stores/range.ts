import { invalidate } from '$app/navigation';
import { defaultRange } from '$lib/components/charts/utils/date-range';
import { DateRange } from '$lib/models/classes/Range.class';
import { writable } from 'svelte/store';

export function createRange() {
	const { subscribe, set } = writable<DateRange>(
		DateRange.createFromMonths(defaultRange),
	);

	return {
		subscribe,

		setMonths: async (months: number) => {
			set(DateRange.createFromMonths(months));

			console.log('invalidating...'); // TODO: rm
			await invalidate('range');
		},
	};
}

export const range = createRange();
