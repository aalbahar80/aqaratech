import { invalidate } from '$app/navigation';
import { derived, get } from 'svelte/store';
import type { Readable } from 'svelte/store';

import L from '$i18n/i18n-svelte';
import {
	FILTER_TYPE,
	type Filter,
} from '$lib/models/interfaces/filter.interface';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaidLate, PAID_LATE } from '$lib/stores/filter/is-paid-late';

export const isPaidLateFilter = derived(isPaidLate, ($isPaidLate) => {
	const LL = get(L);

	return {
		id: FilterEnum.IsPaidLate,
		label: 'Paid Late',
		type: FILTER_TYPE.RADIO,
		options: [
			{
				label: 'Late',
				value: PAID_LATE.LATE,
				active: $isPaidLate === true,
				action: async () => {
					isPaidLate.set(true);
					await invalidate(FilterEnum.IsPaidLate);
				},
			},
			{
				label: 'Not Late',
				value: PAID_LATE.NOT_LATE,
				active: $isPaidLate === false,
				action: async () => {
					isPaidLate.set(false);
					await invalidate(FilterEnum.IsPaidLate);
				},
			},
			{
				label: LL.general.all(),
				value: PAID_LATE.ALL,
				active: $isPaidLate === undefined,
				action: async () => {
					isPaidLate.set(undefined);
					await invalidate(FilterEnum.IsPaidLate);
				},
			},
		],
	};
}) satisfies Readable<Filter>;
