<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';

	import type { PropertyDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { FilterEnum } from '$lib/stores/filter/Filter.enum';
	import { property } from '$lib/stores/filter/property';
	import { unit } from '$lib/stores/filter/unit';

	export let items: PropertyDto[];

	const allPropertiesOption = {
		value: undefined,
		label: $L.general.all(),
	};

	// Show an option: `Unspecified Property` for expenses pages.
	// Not for income/invoices pages, which are always associated with a property.
	const unspecifedPropertyOption = {
		value: null,
		label: $L.other.unspecifiedProperty(),
	};

	const expensesPages = ['financials/expenses'];

	$: showUnspecifiedPropertyOption = expensesPages.some((pathname) =>
		$page.url.pathname.includes(pathname),
	);

	$: propertyOptions = items.map((property) => ({
		value: property.id,
		label: property.title,
	}));

	$: options = [
		allPropertiesOption,
		...(showUnspecifiedPropertyOption ? [unspecifedPropertyOption] : []),
		...propertyOptions,
	];

	onDestroy(() => {
		// Prevent the filter from persisting when navigating to a
		// different portfolio.
		property.set(undefined);
	});
</script>

<Select
	title={$L.entity.property.singular()}
	bind:current={$property}
	{options}
	on:select={async () => {
		// Reset unit when switching properties
		// We are specifically resetting the unit here, rather than resetting
		// whenever $property changes, because the latter preserves the unit when
		// redirecting from the unit.financials tab to the expenses page.

		unit.set(undefined);

		await invalidate(FilterEnum.Property);
	}}
/>
