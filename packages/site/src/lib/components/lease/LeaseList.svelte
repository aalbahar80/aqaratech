<script lang="ts">
	import { page } from '$app/stores';
	import { getCreateHref } from '$components/lease/utils';
	import LeaseCard from '$lib/components/lease/LeaseCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	interface Lease {
		id: string;
		tenant?: {
			id: string;
			firstName: string;
			lastName: string;
		};
		unit?: {
			id: string;
			unitNumber: string;
			property: {
				area: string | null;
				block: string | null;
				street: string | null;
				number: string | null;
			};
		};
		start: Date;
		end: Date;
	}
	export let leases: Lease[];
	export let showIndex = false;

	const newHref = getCreateHref($page.url.pathname);
</script>

<StackedList entity="leases" count={leases.length} {newHref}>
	{#each leases as lease, index (lease.id)}
		<li in:fade|local={{ duration: 200 }} animate:flip={{ duration: 200 }}>
			<LeaseCard
				{lease}
				index={showIndex ? leases.length - index : undefined}
			/>
		</li>
	{/each}
</StackedList>
