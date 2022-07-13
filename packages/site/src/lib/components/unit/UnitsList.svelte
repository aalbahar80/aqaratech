<script lang="ts">
	import { page } from '$app/stores';
	import UnitCard from '$components/unit/UnitCard.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import type { PaginatedUnitDto } from '@self/sdk';
	import FaSolidBath from '~icons/fa-solid/bath';
	import Fa6SolidBed from '~icons/fa6-solid/bed';
	import Fa6SolidElevator from '~icons/fa6-solid/elevator';
	import GisMeasure from '~icons/gis/measure';

	export let units: PaginatedUnitDto;

	const createHref = $page.url.pathname.startsWith('/properties')
		? `/units/new?propertyId=${$page.url.pathname.split('/').pop()}`
		: '/units/new';
</script>

<StackedList entityTitle="units" count={units.results.length} {createHref}>
	{#each units.results as unit (unit.id)}
		{@const icons = [
			{
				label: unit.bed,
				icon: Fa6SolidBed,
				tooltip: 'Bedrooms',
			},
			{
				label: unit.bath,
				icon: FaSolidBath,
				tooltip: 'Bathrooms',
			},
			{
				label: `${unit.size?.toLocaleString()} m²`,
				tooltip: 'Size',
				icon: GisMeasure,
			},
			{
				label: unit.floor,
				icon: Fa6SolidElevator,
				tooltip: 'Elevator',
			},
		]}
		<li>
			<UnitCard {unit} {icons} />
		</li>
	{/each}
	<AnchorPagination pagination={units.pagination} />
</StackedList>
