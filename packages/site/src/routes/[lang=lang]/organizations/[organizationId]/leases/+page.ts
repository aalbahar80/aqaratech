import type { PageLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { leasePhase } from '$lib/stores/filter/lease-phase';
import { parseParams } from '$lib/utils/parse-params';

export const load: PageLoad = async ({
	url: { searchParams },
	fetch,
	depends,
}) => {
	// Filter options
	const leasePhaseFilter = get(leasePhase);

	depends(FilterEnum.LeasePhase);

	const api = createApi(fetch);

	const leases = await api.leases.findAll({
		...parseParams(searchParams),
		filter: {
			computed: {
				phase: leasePhaseFilter === 'ALL' ? undefined : leasePhaseFilter,
			},
		},
	});

	return { leases };
};
