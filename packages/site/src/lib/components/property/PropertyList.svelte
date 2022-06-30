<script lang="ts">
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { PropertyDto } from '@self/sdk';

	export let properties: PropertyDto[];

	const createHref = $page.url.pathname.startsWith('/portfolios')
		? `/new/properties?portfolioId=${$page.url.pathname.split('/').pop()}`
		: '/new/properties';
</script>

<StackedList entityTitle="properties" count={properties.length} {createHref}>
	{#each properties as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
</StackedList>
