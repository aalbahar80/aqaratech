<script lang="ts">
	import type { PropertyDto } from '$api/openapi';
	import Select from '$lib/components/form/inputs/Select.svelte';

	export let properties: PropertyDto[];

	const allPropertiesOption = {
		value: null,
		label: 'All properties',
	};

	$: propertyOptions = properties.map((property) => ({
		value: property.id,
		label: property.title,
	}));

	$: options = [allPropertiesOption, ...propertyOptions];
</script>

<Select
	current={null}
	{options}
	on:select={() => {
		// const value = e.detail.value;
	}}
/>
