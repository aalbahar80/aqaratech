<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Select from '$lib/components/Select.svelte';
	import { toDateInput } from '$lib/utils/common';
	import { getAddress, getUnitLabel } from '$lib/utils/get-label';
	import type { PaginatedPropertyDto, PaginatedUnitDto } from '@self/sdk';

	export let properties: PaginatedPropertyDto;
	export let units: PaginatedUnitDto;

	$: selectedProperty = $page.url.searchParams.get('propertyId');
	$: selectedUnit = $page.url.searchParams.get('unitId');
	$: start = $page.url.searchParams.get('start');
	$: end = $page.url.searchParams.get('end');

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
	<div class="flex flex-col gap-1 md:w-3/5 md:flex-row">
		Range
		<!-- <div class="md:w-1/2">
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
		</div> -->

		<!-- class:date-input-invalid={!rangeValid} -->
		<div class="md:1/2 flex gap-1">
			Start
			<input
				type="date"
				name="start"
				class="date-input"
				value={start ? toDateInput(new Date(start)) : ''}
				on:change={(e) => {
					const baseDate = e.currentTarget.value;
					const date = `${baseDate}T00:00:00.000Z`;
					const url = new URL($page.url);
					url.searchParams.set('start', date);
					goto(url);
				}}
			/>

			End
			<!-- class:date-input-invalid={!rangeValid} -->
			<input
				type="date"
				name="end"
				class="date-input"
				value={end ? toDateInput(new Date(end)) : ''}
				on:change={(e) => {
					const baseDate = e.currentTarget.value;
					const date = `${baseDate}T00:00:00.000Z`;
					const url = new URL($page.url);
					url.searchParams.set('end', date);
					goto(url);
				}}
			/>
		</div>
	</div>

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

<style lang="postcss">
	.date-input {
		@apply block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
	.date-input-invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
