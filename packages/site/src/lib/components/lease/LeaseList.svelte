<script lang="ts">
	import { page } from '$app/stores';
	import { getCreateHref } from '$components/lease/utils';
	import LeaseCard from '$lib/components/lease/LeaseCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedLeaseDto } from '@self/sdk';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	export let leases: PaginatedLeaseDto;
	export let showIndex = false;
	export let formUrl: string;
</script>

<StackedList entityTitle="leases" count={leases.results.length} {formUrl}>
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
