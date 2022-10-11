<script lang="ts">
	import type { PropertyDto, UnitDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Select from '$lib/components/form/inputs/Select.svelte';

	export let properties: PropertyDto[];
	export let units: UnitDto[];

	export let disabledPropertySelector = false;
	export let disabledUnitSelector = false;

	$: selectedProperty = $page.url.searchParams.get('propertyId');
	$: selectedUnit = $page.url.searchParams.get('unitId');

	const propertyOptions = properties.map((property) => ({
		label: property.breadcrumbs.property.label,
		value: property.id,
	}));

	const unitOptions = selectedProperty
		? units
				.filter((unit) => unit.propertyId === selectedProperty)
				.map((unit) => ({
					label: unit.breadcrumbs.unit.label,
					value: unit.id,
				}))
		: units.map((unit) => ({
				label: unit.breadcrumbs.unit.label,
				value: unit.id,
		  }));
</script>

<div
	class="flex flex-col gap-2 md:w-1/2 md:flex-row"
	class:hidden={disabledPropertySelector && disabledUnitSelector}
>
	<!-- Property -->
	<div class="md:w-2/3 md:flex-auto" class:hidden={disabledPropertySelector}>
		<Select
			current={selectedProperty}
			options={[{ label: 'All Properties', value: null }, ...propertyOptions]}
			on:select={(e) => {
				const url = new URL($page.url);
				url.searchParams.delete('unitId');

				const id = e.detail.value;
				if (id) {
					url.searchParams.set('propertyId', id);
				} else {
					url.searchParams.delete('propertyId');
				}

				goto(url, { noscroll: true });
			}}
		/>
	</div>

	<!-- Unit -->
	<div class="md:w-1/3 md:flex-auto" class:hidden={disabledUnitSelector}>
		<Select
			current={selectedUnit}
			options={[{ label: 'All Units', value: null }, ...unitOptions]}
			disabled={false && !selectedProperty}
			on:select={async (e) => {
				const url = new URL($page.url);

				const id = e.detail.value;
				if (id) {
					url.searchParams.set('unitId', id);
				} else {
					url.searchParams.delete('unitId');
				}

				await goto(url, { noscroll: true });
			}}
		/>
	</div>
</div>
