<script lang="ts">
	import type { UnitDto } from '$api/openapi';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { FilterEnum } from '$lib/stores/filter/Filter.enum';
	import { property } from '$lib/stores/filter/property';
	import { unit } from '$lib/stores/filter/unit';

	export let items: UnitDto[];

	const allUnitsOption = {
		value: undefined,
		label: 'All units',
	};

	// Show an option: `Unspecified Unit` for expenses pages.
	// Not for income/invoices pages, which are always associated with a unit.
	const unspecifedUnitOption = {
		value: null,
		label: 'Unspecified Unit',
	};

	const expensesPages = ['financials/expenses'];

	$: showUnspecifiedUnitOption = expensesPages.some((pathname) =>
		$page.url.pathname.includes(pathname),
	);

	$: unitOptions = items
		.filter((unit) => unit.propertyId === $property)
		.map((unit) => ({
			value: unit.id,
			label: unit.title,
		}));

	$: options =
		unitOptions.length > 0
			? [
					allUnitsOption,
					...(showUnspecifiedUnitOption ? [unspecifedUnitOption] : []),
					...unitOptions,
			  ]
			: // If no units, display a single option 'No units'
			  [
					{
						value: undefined,
						label: 'No units',
					},
			  ];

	// Reset unit when property changes
	$: {
		$property;
		$unit = undefined;
	}
</script>

<Select
	title="Unit"
	bind:current={$unit}
	disabled={!$property || options.length === 1}
	{options}
	on:select={async () => {
		await invalidate(FilterEnum.Unit);
	}}
/>
