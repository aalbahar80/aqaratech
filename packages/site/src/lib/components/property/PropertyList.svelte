<script lang="ts">
	import { page } from '$app/stores';
	import PropertyCard from '$components/property/PropertyCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { PaginatedPropertyDto } from '@self/sdk';

	export let properties: PaginatedPropertyDto;

	const predefined =
		$page.url.pathname.startsWith('/portfolios') &&
		new Map<string, any>([
			['portfolioId', $page.url.pathname.split('/').pop()],
		]);
</script>

<StackedList
	entityTitle="properties"
	count={properties.results.length}
	{predefined}
>
	{#each properties.results as property, idx (property.id)}
		<li>
			<PropertyCard {property} {idx} />
		</li>
	{/each}
	<AnchorPagination pagination={properties.pagination} />
</StackedList>
