<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import {
		defaultRange,
		defaultRangeEnd,
		rangeStart,
	} from '$lib/components/charts/utils/date-range';
	import Select from '$lib/components/Select.svelte';
	import { toDateInput } from '$lib/utils/common';
	import { getAddress, getUnitLabel } from '$lib/utils/get-label';
	import type { PropertyDto, UnitDto } from '@self/sdk';

	export let properties: PropertyDto[];
	export let units: UnitDto[];
	export let disabledPropertySelector = false;
	export let disabledUnitSelector = false;

	$: selectedProperty = $page.url.searchParams.get('propertyId');
	$: selectedUnit = $page.url.searchParams.get('unitId');
	$: start = $page.url.searchParams.get('start') || rangeStart(defaultRange);
	$: end = $page.url.searchParams.get('end') || defaultRangeEnd();

	const propertyOptions = properties.map((property) => ({
		label: getAddress(property),
		value: property.id,
	}));

	const unitOptions = selectedProperty
		? units
				.filter((unit) => unit.propertyId === selectedProperty)
				.map((unit) => ({
					label: getUnitLabel(unit),
					value: unit.id,
				}))
		: units.map((unit) => ({
				label: getUnitLabel(unit),
				value: unit.id,
		  }));

	const rangeOptions = [
		{ value: 0, label: 'Month to date' },
		{ value: 3, label: 'Last 3 months' },
		{ value: 6, label: 'Last 6 months' },
		{ value: 12, label: 'Last 12 months' },
		{ value: null, label: 'Custom' },
	];

	$: rangeValid = start && end && new Date(start) < new Date(end);
</script>

<div
	class="z-10 flex max-w-screen-lg flex-col justify-between gap-3 bg-gray-100 bg-opacity-20 pb-0.5 pt-4 backdrop-blur md:sticky md:top-0 md:flex-row"
>
	<!-- Date Filters -->
	<div class="flex flex-col gap-1 md:w-3/5 md:flex-auto md:flex-row">
		<!-- Range -->
		<div class="md:w-1/2">
			<Select
				current={defaultRange}
				options={rangeOptions}
				on:select={(e) => {
					const value = e.detail.value;
					if (value !== null && value !== undefined) {
						// value of zero is acceptable here since it represents month-to-date
						const url = new URL($page.url);
						url.searchParams.set('start', rangeStart(value));
						url.searchParams.set('end', new Date().toISOString());
						goto(url, { noscroll: true });
					}
				}}
			/>
		</div>

		<div class="flex gap-1 md:w-1/2">
			<!-- Start -->
			<input
				type="date"
				name="start"
				class="date-input"
				class:date-input-invalid={!rangeValid}
				value={start ? toDateInput(new Date(start)) : ''}
				on:change={(e) => {
					const baseDate = e.currentTarget.value;
					const date = `${baseDate}T00:00:00.000Z`;
					const url = new URL($page.url);
					url.searchParams.set('start', date);
					goto(url, { noscroll: true });
				}}
			/>

			<!-- End -->
			<input
				type="date"
				name="end"
				class="date-input"
				class:date-input-invalid={!rangeValid}
				value={end ? toDateInput(new Date(end)) : ''}
				on:change={(e) => {
					const baseDate = e.currentTarget.value;
					const date = `${baseDate}T00:00:00.000Z`;
					const url = new URL($page.url);
					url.searchParams.set('end', date);
					goto(url, { noscroll: true });
				}}
			/>
		</div>
	</div>

	<!-- Property/Unit Filters -->
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

					goto(url, { noscroll: true });
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
