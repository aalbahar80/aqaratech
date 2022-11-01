import { invalidate } from '$app/navigation';
import { defaultRange } from '$lib/components/charts/utils/date-range';
import { endOfMonthN, startOfMonthN } from '@self/utils';
import { writable } from 'svelte/store';
import { z } from 'zod';

interface Range {
	start: string;
	end: string;
	months: number;
}

export function createRange() {
	const { subscribe, set, update } = writable<Range>({
		months: defaultRange,
		start: startOfMonthN(defaultRange).split('T')[0],
		end: endOfMonthN(0).split('T')[0],
	});

	return {
		subscribe,

		// set,

		update,

		setMonthCount: async (input: number | null) => {
			const count = z.number().min(0).parse(input);

			set({
				months: count,
				start: startOfMonthN(count).split('T')[0],
				end: endOfMonthN(0).split('T')[0],
			});

			await invalidate('range');
		},

		setCustomRange: (input: Range) => {
			set(input);
		},
	};
}

export const range = createRange();
