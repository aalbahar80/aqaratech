import { invalidate } from '$app/navigation';
import { derived, get } from 'svelte/store';
import type { Readable } from 'svelte/store';

import L from '$i18n/i18n-svelte';
import { getIntlLabel } from '$lib/i18n/get-intl-label';
import {
	FILTER_TYPE,
	type Filter,
} from '$lib/models/interfaces/filter.interface';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { LEASE_PHASE, leasePhase } from '$lib/stores/filter/lease-phase';

export const leasePhaseFilter = derived(leasePhase, ($leasePhase) => {
	const LL = get(L);

	return {
		id: FilterEnum.LeasePhase,
		label: getIntlLabel('status', false),
		type: FILTER_TYPE.RADIO,
		options: [
			{
				label: LL.badge.expired(),
				value: LEASE_PHASE.Complete,
				active: LEASE_PHASE.Complete === $leasePhase,
				action: async () => {
					leasePhase.set(LEASE_PHASE.Complete);
					await invalidate(FilterEnum.LeasePhase);
				},
			},
			{
				label: LL.badge.current(),
				value: LEASE_PHASE.Ongoing,
				active: LEASE_PHASE.Ongoing === $leasePhase,
				action: async () => {
					leasePhase.set(LEASE_PHASE.Ongoing);
					await invalidate(FilterEnum.LeasePhase);
				},
			},
			{
				label: LL.badge.upcoming(),
				value: LEASE_PHASE.Future,
				active: LEASE_PHASE.Future === $leasePhase,
				action: async () => {
					leasePhase.set(LEASE_PHASE.Future);
					await invalidate(FilterEnum.LeasePhase);
				},
			},
			{
				label: LL.general.all(),
				value: LEASE_PHASE.ALL,
				active: LEASE_PHASE.ALL === $leasePhase,
				action: async () => {
					leasePhase.set(LEASE_PHASE.ALL);
					await invalidate(FilterEnum.LeasePhase);
				},
			},
		],
	};
}) satisfies Readable<Filter>;
