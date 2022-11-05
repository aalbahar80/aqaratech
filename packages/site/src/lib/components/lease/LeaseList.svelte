<script lang="ts">
	import type { PaginatedLeaseDto } from '$api/openapi';
	import { page } from '$app/stores';
	import LeaseCard from '$lib/components/lease/LeaseCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { getRoute } from '$lib/utils/route-helpers/get-route';
	import { PageType } from '$lib/utils/route-helpers/route-helpers.type';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	export let leases: PaginatedLeaseDto;
	export let showIndex = false;
</script>

<StackedList
	entity="lease"
	count={leases.results.length}
	formUrl={getRoute({
		entity: 'lease',
		pageType: PageType.New,
		params: $page.params,
		predefined: {
			unitId: $page.params.unitId,
		},
	})}
>
	{#each leases.results as lease, index (lease.id)}
		<li in:fade|local={{ duration: 200 }} animate:flip={{ duration: 200 }}>
			<LeaseCard
				{lease}
				index={showIndex ? leases.results.length - index : undefined}
			/>
		</li>
	{/each}
	<AnchorPagination pagination={leases.pagination} />
</StackedList>
