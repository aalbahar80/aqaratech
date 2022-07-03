<script lang="ts">
	import { page } from '$app/stores';
	import { getCreateHref } from '$components/lease/utils';
	import LeaseCard from '$lib/components/lease/LeaseCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { PaginatedResponseOfLeaseDto } from '@self/sdk';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	export let leases: PaginatedResponseOfLeaseDto;
	export let showIndex = false;

	const createHref = getCreateHref($page.url.pathname);
</script>

<StackedList entityTitle="leases" count={leases.results.length} {createHref}>
	{#each leases.results as lease, index (lease.id)}
		<li in:fade|local={{ duration: 200 }} animate:flip={{ duration: 200 }}>
			<LeaseCard
				{lease}
				index={showIndex ? leases.results.length - index : undefined}
			/>
		</li>
	{/each}
</StackedList>
