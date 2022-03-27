<script context="module" lang="ts">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import Chart from '$lib/components/dashboard/Chart.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import SampleChart from '$lib/components/dashboard/SampleChart.svelte';
	import { getAddress } from '$lib/definitions/property';
	import { getLabel } from '$lib/definitions/unit';
	import Select from 'svelte-select';
	// import Select from 'svelte-select/src/Select.svelte';
	import type { Load } from './dashboard';

	export const load: Load = async ({ params }) => {
		const defaultFilters = {
			// TODO use UTC, fns
			start: new Date(2020, 0, 1),
			end: new Date(2020, 3, 1),
			propertyId: undefined,
			unitId: undefined,
		};

		const client = await trpc.query('clients:dashboard', params.id);
		const data = await trpc.query('charts:income', {
			clientId: params.id,
			...defaultFilters,
		});
		return { props: { client, data } };
	};
</script>

<script lang="ts">
	export let client: InferQueryOutput<'clients:dashboard'>;
	export let data: InferQueryOutput<'charts:income'>;

	type Option = { value: string; label: string };
	type SelectedOption = Option | null | undefined;
	const rangeOptions: Option[] = [
		{ value: 'LAST3MONTHS', label: 'Last 3 Months' },
		{ value: 'LAST6MONTHS', label: 'Last 6 Months' },
		{ value: 'LAST12MONTHS', label: 'Last 12 Months' },
		{ value: 'CUSTOM', label: 'Custom' },
	];

	const propertyOptions = client.properties.map((property) => ({
		value: property.id,
		label: getAddress(property),
	}));

	const getUnitOptions = (newPropertyId: SelectedOption) => {
		if (newPropertyId) {
			const newProperty = client.properties.find(
				(property) => property.id === newPropertyId.value,
			);

			const newUnits = newProperty
				? newProperty.units.map((unit) => ({
						value: unit.id,
						label: getLabel(unit),
				  }))
				: [];

			return newUnits;
		}

		return [];
	};

	let selectedProperty: SelectedOption;
	let selectedUnit: SelectedOption;
	$: unitOptions = getUnitOptions(selectedProperty);
	$: console.log(selectedProperty);
	$: console.log(selectedUnit);
</script>

<div class="mx-auto flex max-w-screen-lg flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<h1>Dashboard</h1>
	<div class="flex max-w-screen-lg justify-between gap-x-2">
		<!-- Date Filters -->
		<div class="flex w-3/5 gap-x-1 pr-3">
			<div class="w-1/2">
				<Select
					items={rangeOptions}
					value={rangeOptions[1]}
					isClearable={false}
					showIndicator
					isSearchable={false}
				/>
			</div>
			<input type="date" name="start" class="date-input" />
			<input type="date" name="end" class="date-input" />
		</div>

		<!-- Property/Unit Filters -->
		<div class="flex w-1/2 gap-x-1">
			<!-- Property -->
			<div class="w-2/3">
				<Select
					placeholder="All Properties"
					items={propertyOptions}
					bind:value={selectedProperty}
					on:clear={() => {
						selectedProperty = null;
						selectedUnit = null;
					}}
					showIndicator
				/>
			</div>

			<!-- Unit -->
			<div class="w-1/3">
				<Select
					placeholder="All Units"
					items={unitOptions}
					bind:value={selectedUnit}
					isDisabled={!selectedProperty}
					showIndicator
				/>
			</div>
		</div>
	</div>

	<!-- Chart -->
	<DashCard title="Rent Income" subtitle="The total amount of rent due.">
		<Chart {data} />
	</DashCard>
</div>

<style lang="postcss">
	.date-input {
		@apply block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
</style>
