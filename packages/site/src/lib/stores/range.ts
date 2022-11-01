import { defaultRange } from '$lib/components/charts/utils/date-range';
import { endOfMonthN, startOfMonthN } from '@self/utils';
import { derived, writable, type Writable } from 'svelte/store';

export const range = writable<SimpleRange>(defaultRange);

export const rangeCustom = derived<Writable<SimpleRange>, CustomRange>(
	range,
	($range) => {
		return {
			start: startOfMonthN($range),
			end: endOfMonthN(0),
		};
	},
);

type SimpleRange = number;

interface CustomRange {
	start: string;
	end: string;
}
