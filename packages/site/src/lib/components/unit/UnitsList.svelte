<script lang="ts">
	import { page } from '$app/stores';
	import UnitCard from '$components/unit/UnitCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedUnitDto } from '@self/sdk';

	export let units: PaginatedUnitDto;
</script>

<StackedList
	entity="unit"
	count={units.results.length}
	formUrl={create({
		entity: 'unit',
		predefined:
			$page.url.pathname.startsWith('/properties') &&
			new Map([
				['portfolioId', units.results[0]?.breadcrumbs.portfolio.id],
				['propertyId', $page.url.pathname.split('/').pop()],
			]),
	})}
>
	{#each units.results as unit (unit.id)}
		<li>
			<UnitCard {unit} />
		</li>
	{/each}
	<AnchorPagination pagination={units.pagination} />
</StackedList>
