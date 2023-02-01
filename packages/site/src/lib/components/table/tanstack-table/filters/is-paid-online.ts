import { invalidate } from '$app/navigation';
import { derived, get } from 'svelte/store';
import type { Readable } from 'svelte/store';

import L from '$i18n/i18n-svelte';
import {
	FILTER_TYPE,
	type Filter,
} from '$lib/models/interfaces/filter.interface';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaidOnline, PAY_METHOD } from '$lib/stores/filter/is-paid-online';

export const isPaidOnlineFilter = derived(isPaidOnline, ($isPaidOnline) => {
	const LL = get(L);

	return {
		id: FilterEnum.IsPaidOnline,
		label: LL.general.paymentMethod(),
		type: FILTER_TYPE.RADIO,
		options: [
			{
				label: LL.general.online(),
				value: PAY_METHOD.ONLINE,
				active: $isPaidOnline,
				action: async () => {
					isPaidOnline.set(true);
					await invalidate(FilterEnum.IsPaidOnline);
				},
			},
			{
				label: LL.general.all(),
				value: PAY_METHOD.MANUAL,
				active: $isPaidOnline,
				action: async () => {
					isPaidOnline.set(false);
					await invalidate(FilterEnum.IsPaidOnline);
				},
			},
		],
	};
}) satisfies Readable<Filter>;
