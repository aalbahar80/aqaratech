<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Select from '$lib/components/Select.svelte';
	import { getAddress, getUnitLabel } from '$lib/utils/get-label';
	import type { PaginatedPropertyDto, PaginatedUnitDto } from '@self/sdk';

	export let properties: PaginatedPropertyDto;
	export let units: PaginatedUnitDto;

	$: selectedProperty = $page.url.searchParams.get('propertyId');
	$: selectedUnit = $page.url.searchParams.get('unitId');

	const propertyOptions = properties.results.map((property) => ({
		label: getAddress(property),
		value: property.id,
	}));

	const unitOptions = selectedProperty
		? units.results
				.filter((unit) => unit.propertyId === selectedProperty)
				.map((unit) => ({
					label: getUnitLabel(unit),
					value: unit.id,
				}))
		: units.results.map((unit) => ({
				label: getUnitLabel(unit),
				value: unit.id,
		  }));

	// const rangeOptions = [
	// 	{ value: 3, label: 'Last 3 months' },
	// 	{ value: 6, label: 'Last 6 months' }, // rethink selected vs bind
	// 	{ value: 12, label: 'Last 12 months' },
	// 	{ value: 0, label: 'Custom' },
	// ];
	// let selectedRange = 6;
</script>

<div class="flex max-w-screen-lg flex-col justify-between gap-3 md:flex-row">
	Date Filters
	<!-- <div class="flex flex-col gap-1 md:w-3/5 md:flex-row">
		Range
		<div class="md:w-1/2">
			rethink bind
			<Select
				bind:current={selectedRange}
				options={rangeOptions}
				on:select={(e) => {
					if (+e.detail.value) {
						handleFilter({
							...filter,
							...getRange(+e.detail.value),
						});
					}
				}}
			/>
		</div>

		<div class="md:1/2 flex gap-1">
			Start
			<input
				type="date"
				name="start"
				class="date-input"
				class:date-input-invalid={!rangeValid}
				value={startInput}
				on:change={(e) => {
					const newDate = e.currentTarget.valueAsNumber;
					if (newDate) {
						selectedRange = 0;
						handleFilter({
							...filter,
							start: newDate,
						});
					}
				}}
			/>

			End
			<input
				type="date"
				name="end"
				class="date-input"
				class:date-input-invalid={!rangeValid}
				value={endInput}
				on:change={(e) => {
					const newDate = e.currentTarget.valueAsNumber;
					console.log({ newDate }, 'dashboard.svelte ~ 209');
					if (newDate) {
						selectedRange = 0;
						handleFilter({
							...filter,
							end: newDate,
						});
					}
				}}
			/>
		</div>
	</div> -->

	Property/Unit Filters
	<div class="flex flex-col gap-2 md:w-1/2 md:flex-row">
		Property
		<div class="md:w-2/3">
			<Select
				current={selectedProperty}
				options={propertyOptions}
				on:select={(e) => {
					const url = new URL($page.url);
					url.searchParams.delete('unitId');
					url.searchParams.set('propertyId', e.detail.value);
					goto(url);
				}}
			/>
		</div>

		Unit
		<div class="md:w-1/3">
			<Select
				current={selectedUnit}
				options={unitOptions}
				disabled={false && !selectedProperty}
				on:select={async (e) => {
					const url = new URL($page.url);
					url.searchParams.set('unitId', e.detail.value);
					goto(url);
				}}
			/>
		</div>
	</div>
</div>
