<script lang="ts">
	import type { PropertyDto } from '$api/openapi';
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { FilterEnum } from '$lib/stores/filter/Filter.enum';
	import { property } from '$lib/stores/filter/property';

	export let items: PropertyDto[];

	const allPropertiesOption = {
		value: undefined,
		label: 'All properties',
	};

	// Show an option: `Unspecified Property` for expenses pages.
	// Not for income/invoices pages, which are always associated with a property.
	const unspecifedPropertyOption = {
		value: null,
		label: 'Unspecified Property',
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
</script>

<Select
	title="Property"
	bind:current={$property}
	{options}
	on:select={async () => {
		await invalidate(FilterEnum.Property);
	}}
/>
