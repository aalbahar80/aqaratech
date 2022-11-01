<script lang="ts">
	import type { PropertyDto } from '$api/openapi';
	import { invalidate } from '$app/navigation';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { FilterEnum } from '$lib/stores/filter/Filter.enum';
	import { property } from '$lib/stores/filter/property';

	export let properties: PropertyDto[];

	const allPropertiesOption = {
		value: undefined,
		label: 'All properties',
	};

	$: propertyOptions = properties.map((property) => ({
		value: property.id,
		label: property.title,
	}));

	$: options = [allPropertiesOption, ...propertyOptions];
</script>

<Select
	bind:current={$property}
	{options}
	on:select={async () => {
		await invalidate(FilterEnum.Property);
	}}
/>
