<script lang="ts">
	import Combobox from '$lib/components/form/inputs/Combobox.svelte';
	import type { SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import { createEventDispatcher } from 'svelte';

	/**
	 * Expects a fields array where:
	 *```
	 * index 0: SelectField(portfolioId)
	 * index 1?: SelectField(propertyId)
	 * index 2?: SelectField(unitId)
	 * ```
	 */
	export let fields: SelectField<RelOption>[];

	let portfolioId: any;
	let propertyId: any;

	const dispatch = createEventDispatcher<{
		select: { name: string; value: any };
	}>();

	$: filteredProperties =
		portfolioId && fields[1]
			? fields[1].options.filter(
					(option) => option.meta?.parentId === portfolioId,
			  )
			: fields[1]?.options || [];

	$: filteredUnits =
		portfolioId && propertyId && fields[2]
			? fields[2].options.filter(
					(option) => option.meta?.parentId === propertyId,
			  )
			: fields[2]?.options || [];

	let propertySelector: Combobox | undefined;
	let unitSelector: Combobox | undefined;
</script>

<!-- Portfolio -->
{#if fields[0] && fields[0].name === 'portfolioId'}
	<Combobox
		options={fields[0].options}
		initialValue={fields[0].value}
		disabled={fields[0].disabled}
		on:select={(e) => {
			propertySelector?.clear();
			portfolioId = e.detail.value;
			dispatch('select', { name: 'portfolioId', value: e.detail.value });
		}}
	/>
{/if}

<!-- Property -->
{#if fields[1] && fields[1].name === 'propertyId'}
	<Combobox
		bind:this={propertySelector}
		options={filteredProperties}
		disabled={fields[1].disabled}
		on:select={(e) => {
			unitSelector?.clear();
			propertyId = e.detail.value;
			dispatch('select', { name: 'propertyId', value: e.detail.value });
		}}
	/>
{/if}

<!-- Unit -->
{#if fields[2] && fields[2].name === 'unitId'}
	<Combobox
		bind:this={unitSelector}
		options={filteredUnits}
		disabled={fields[2].disabled}
		on:select={(e) => {
			dispatch('select', { name: 'unitId', value: e.detail.value });
		}}
	/>
{/if}
