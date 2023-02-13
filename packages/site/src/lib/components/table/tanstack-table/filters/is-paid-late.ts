import { invalidate } from '$app/navigation';
import type { Readable } from 'svelte/store';
import { derived, get } from 'svelte/store';
import { PAID_LATE } from '@self/utils';

import L from '$i18n/i18n-svelte';
import {
	FILTER_TYPE,
	type Filter,
} from '$lib/models/interfaces/filter.interface';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaidLate } from '$lib/stores/filter/is-paid-late';

export const isPaidLateFilter = derived(isPaidLate, ($isPaidLate) => {
	const LL = get(L);

	return {
		id: FilterEnum.IsPaidLate,
		label: LL.filter.isPaidLate(),
		type: FILTER_TYPE.RADIO,
		options: [
			{
				label: LL.badge.advanced(),
				value: PAID_LATE.ADVANCED,
				active: PAID_LATE.ADVANCED === $isPaidLate,
				action: async () => {
					isPaidLate.set(PAID_LATE.ADVANCED);
					await invalidate(FilterEnum.IsPaidLate);
				},
			},
			{
				label: LL.badge.onTime(),
				value: PAID_LATE.ON_TIME,
				active: PAID_LATE.ON_TIME === $isPaidLate,
				action: async () => {
					isPaidLate.set(PAID_LATE.ON_TIME);
					await invalidate(FilterEnum.IsPaidLate);
				},
			},
			{
				label: LL.general.late(),
				value: PAID_LATE.LATE,
				active: PAID_LATE.LATE === $isPaidLate,
				action: async () => {
					isPaidLate.set(PAID_LATE.LATE);
					await invalidate(FilterEnum.IsPaidLate);
				},
			},
			{
				label: LL.general.all(),
				value: PAID_LATE.ALL,
				active: PAID_LATE.ALL === $isPaidLate,
				action: async () => {
					isPaidLate.set(PAID_LATE.ALL);
					await invalidate(FilterEnum.IsPaidLate);
				},
			},
		],
	};
}) satisfies Readable<Filter>;
