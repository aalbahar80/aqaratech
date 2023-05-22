import { invalidate } from '$app/navigation';
import type { Readable } from 'svelte/store';
import { derived, get } from 'svelte/store';
import { PAY_PHASE } from '@self/utils';

import L from '$i18n/i18n-svelte';
import {
	FILTER_TYPE,
	type Filter,
} from '$lib/models/interfaces/filter.interface';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { payPhase } from '$lib/stores/filter/pay-phase';

export const payPhaseFilter = derived(payPhase, ($payPhase) => {
	const LL = get(L);

	return {
		id: FilterEnum.PayPhase,
		label: LL.filter.payPhase(),
		type: FILTER_TYPE.RADIO,
		options: [
			{
				label: LL.badge.advanced() + ' / ' + LL.badge.notYetDue(),
				value: PAY_PHASE.ADVANCED,
				active: PAY_PHASE.ADVANCED === $payPhase,
				action: async () => {
					payPhase.set(PAY_PHASE.ADVANCED);
					await invalidate(FilterEnum.PayPhase);
				},
			},
			{
				label: LL.badge.onTime() + ' / ' + LL.badge.due(),
				value: PAY_PHASE.ON_TIME,
				active: PAY_PHASE.ON_TIME === $payPhase,
				action: async () => {
					payPhase.set(PAY_PHASE.ON_TIME);
					await invalidate(FilterEnum.PayPhase);
				},
			},
			{
				label: LL.general.late() + ' / ' + LL.badge.overdue(),
				value: PAY_PHASE.LATE,
				active: PAY_PHASE.LATE === $payPhase,
				action: async () => {
					payPhase.set(PAY_PHASE.LATE);
					await invalidate(FilterEnum.PayPhase);
				},
			},
			{
				label: LL.general.all(),
				value: PAY_PHASE.ALL,
				active: PAY_PHASE.ALL === $payPhase,
				action: async () => {
					payPhase.set(PAY_PHASE.ALL);
					await invalidate(FilterEnum.PayPhase);
				},
			},
		],
	};
}) satisfies Readable<Filter>;
