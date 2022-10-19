<script lang="ts">
	import { createApi } from '$api';
	import Combobox from '$lib/components/form/inputs/Combobox.svelte';
	import InputWrapper from '$lib/components/form/inputs/InputWrapper.svelte';
	import {
		propertiesToOptions,
		unitsToOptions,
	} from '$lib/components/form/inputs/to-options';
	import type { SelectField } from '$lib/models/classes/Field.class';
	import type { RelOption } from '$lib/models/interfaces/option.interface';
	import { createEventDispatcher } from 'svelte';

	/**
	 * Expects a fields array where:
	 *```
	 * index 0: SelectField(portfolioId)
	 * index 1?: SelectField(propertyId)
	 * index 2?: SelectField(unitId)
	 * index 3?: SelectField(tenantId)
	 * ```
	 */
	export let fields: SelectField<RelOption>[];
	export let errors: Record<string, any>;

	// setting inital values here allow us children array filtering to be accurate from the start
	let portfolioId = fields[0]?.value;
	let propertyId = fields[1]?.value;

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

<!-- Tenant -->
{#if fields[3] && fields[3].name === 'tenantId'}
	<InputWrapper field={fields[3]}>
		<Combobox
			inputId={fields[3].name}
			options={fields[3].options}
			initialValue={fields[3].value}
			disabled={fields[3].disabled}
			invalid={errors.tenantId}
			on:select={(e) => {
				dispatch('select', { name: 'tenantId', value: e.detail.value });
			}}
		/>
	</InputWrapper>
{/if}

<!-- Portfolio -->
{#if fields[0] && fields[0].name === 'portfolioId'}
	<InputWrapper field={fields[0]}>
		<Combobox
			inputId={fields[0].name}
			options={fields[0].options}
			initialValue={fields[0].value}
			disabled={fields[0].disabled}
			invalid={errors.portfolioId}
			on:select={async (e) => {
				propertySelector?.clear();
				const newSelection = e.detail.value;
				if (typeof newSelection === 'string' && fields[1]) {
					const children = await createApi().portfolios.findProperties({
						id: newSelection,
						take: 1000,
					});
					fields[1].options = propertiesToOptions(children);
				}
				portfolioId = newSelection;
				dispatch('select', { name: 'portfolioId', value: newSelection });
			}}
		/>
	</InputWrapper>
{/if}

<!-- Property -->
{#if fields[1] && fields[1].name === 'propertyId'}
	<InputWrapper field={fields[1]}>
		<Combobox
			inputId={fields[1].name}
			bind:this={propertySelector}
			options={filteredProperties}
			initialValue={fields[1].value}
			disabled={fields[1].disabled}
			invalid={errors.propertyId}
			on:select={async (e) => {
				unitSelector?.clear();
				const newSelection = e.detail.value;
				if (typeof newSelection === 'string' && fields[2]) {
					const children = await createApi().properties.findUnits({
						id: newSelection,
						take: 1000,
					});
					fields[2].options = unitsToOptions(children);
				}
				propertyId = newSelection;
				dispatch('select', { name: 'propertyId', value: newSelection });
			}}
		/>
	</InputWrapper>
{/if}

<!-- Unit -->
{#if fields[2] && fields[2].name === 'unitId'}
	<InputWrapper field={fields[2]}>
		<Combobox
			inputId={fields[2].name}
			bind:this={unitSelector}
			options={filteredUnits}
			initialValue={fields[2].value}
			disabled={fields[2].disabled}
			invalid={errors.unitId}
			on:select={(e) => {
				dispatch('select', { name: 'unitId', value: e.detail.value });
			}}
		/>
	</InputWrapper>
{/if}
