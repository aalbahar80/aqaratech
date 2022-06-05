<script lang="ts">
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import StackedList from '$lib/components/StackedList.svelte';

	type Properties = NonNullable<
		InferQueryOutput<'portfolios:read'>
	>['properties'];
	export let properties: Properties;

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
