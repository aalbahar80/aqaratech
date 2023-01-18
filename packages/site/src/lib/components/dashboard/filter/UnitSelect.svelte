<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import { computeLabelUnit } from '@self/utils';

	import type { UnitMinimalDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { FilterEnum } from '$lib/stores/filter/Filter.enum';
	import { property } from '$lib/stores/filter/property';
	import { unit } from '$lib/stores/filter/unit';

	export let items: UnitMinimalDto[];

	const allUnitsOption = {
		value: undefined,
		label: $L.general.all(),
	};

	// Show an option: `Unspecified Unit` for expenses pages.
	// Not for income/invoices pages, which are always associated with a unit.
	const unspecifedUnitOption = {
		value: null,
		label: $L.general.unspecified(),
	};

	const expensesPages = ['financials/expenses'];

	$: showUnspecifiedUnitOption = expensesPages.some((pathname) =>
		$page.url.pathname.includes(pathname),
	);

	$: unitOptions = items
		.filter((unit) => unit.propertyId === $property)
		.map((unit) => ({
			value: unit.id,
			label: computeLabelUnit(unit),
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

	onDestroy(() => {
		// Prevent the filter from persisting when navigating to a
		// different portfolio.
		unit.set(undefined);
	});
</script>

<Select
	title={$L.entity.unit.singular()}
	bind:current={$unit}
	disabled={!$property || options.length === 1}
	{options}
	on:select={async () => {
		await invalidate(FilterEnum.Unit);
	}}
/>
