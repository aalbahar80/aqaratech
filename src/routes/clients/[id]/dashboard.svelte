<script context="module" lang="ts">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import { incomeChart } from '$lib/components/dashboard/charts/income';
	import { getAddress } from '$lib/definitions/property';
	import { getLabel } from '$lib/definitions/unit';
	import type { filterSchema } from '$lib/server/trpc/charts';
	import Select from 'svelte-select';
	import type { z } from 'zod';
	// import Select from 'svelte-select/src/Select.svelte';
	import type { Load } from './dashboard';

	type Filter = z.infer<typeof filterSchema>;

	export const load: Load = async ({ params }) => {
		const defaultFilter: Filter = {
			// TODO use UTC, fns
			start: new Date(2020, 0, 1),
			end: new Date(2021, 3, 1),
			propertyId: undefined,
			unitId: undefined,
			clientId: params.id,
		};

		const [client, data] = await Promise.all([
			trpc.query('clients:dashboard', params.id), // TODO use read?
			trpc.query('charts:income', {
				...defaultFilter,
			}),
		]);
		return { props: { client, data, filter: defaultFilter } };
	};
</script>

<script lang="ts">
	export let client: InferQueryOutput<'clients:dashboard'>;
	export let data: InferQueryOutput<'charts:income'>;
	export let filter: Filter;

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

	const handleFilter = async (newFilter: Filter) => {
		console.log({ newFilter }, 'dashboard.svelte ~ 82');
		data = await trpc.query('charts:income', newFilter);
	};
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
			<input
				type="date"
				name="start"
				class="date-input"
				on:change={(e) => {
					handleFilter({
						...filter,
						start: e.currentTarget.valueAsDate,
					});
				}}
			/>
			<input
				type="date"
				name="end"
				class="date-input"
				on:change={(e) => {
					handleFilter({
						...filter,
						end: e.currentTarget.valueAsDate,
					});
				}}
			/>
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
					on:select={(e) => {
						handleFilter({
							...filter,
							propertyId: e.detail.value,
							unitId: null,
						});
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
					on:select={(e) => {
						handleFilter({
							...filter,
							unitId: e.detail.value.value,
						});
					}}
				/>
			</div>
		</div>
	</div>

	<!-- Chart -->
	<DashCard title="Rent Income" subtitle="The total amount of rent due.">
		<canvas width="400" height="400" use:incomeChart={data} />
	</DashCard>
</div>
<pre>{JSON.stringify(data, null, 2)}</pre>

<style lang="postcss">
	.date-input {
		@apply block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
</style>
