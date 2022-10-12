<script lang="ts">
	import type { PaginatedUnitDto, UnitDto } from '$api/openapi';
	import { page } from '$app/stores';
	import RadioButtons from '$lib/components/buttons/RadioButtons.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import UnitCard from '$lib/components/unit/UnitCard.svelte';
	import { create } from '$lib/utils/route-helpers';
	import { getContext } from 'svelte';
	import { flip } from 'svelte/animate';
	import { writable } from 'svelte/store';

	export let units: PaginatedUnitDto;

	const options = [
		{
			label: 'Type',
			value: 'type',
		},
		{
			label: 'Number',
			value: 'number',
		},
	];

	const sortBy = writable<typeof options[number]>(options[0]);

	$: {
		let sorted: UnitDto[] = units.results;
		if (units && $sortBy.value === 'type') {
			sorted = units.results.sort((a, b) =>
				(a.type || '').localeCompare(b.type || ''),
			);
		} else if (units && $sortBy.value === 'number') {
			sorted = units.results.sort((a, b) => +a.unitNumber - +b.unitNumber);
		}
		units = {
			...units,
			results: sorted,
		};
	}
</script>

<StackedList
	entity="unit"
	count={units.results.length}
	formUrl={create({
		entity: 'unit',
		predefined:
			$page.url.pathname.startsWith('/properties') &&
			new Map([
				['portfolioId', getContext('portfolio').id],
				['propertyId', $page.url.pathname.split('/').pop()],
			]),
	})}
>
	<div slot="secondary">
		<RadioButtons {options} bind:selected={$sortBy} />
	</div>
	{#each units.results as unit (unit.id)}
		<li animate:flip={{ duration: 300 }}>
			<UnitCard {unit} />
		</li>
	{/each}
	<AnchorPagination pagination={units.pagination} />
</StackedList>
