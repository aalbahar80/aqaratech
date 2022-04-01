<script context="module" lang="ts">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import Chart from '$lib/components/Chart.svelte';
	import { expensesChart } from '$lib/components/dashboard/charts/expenses';
	import { incomeChart } from '$lib/components/dashboard/charts/income';
	import { occupancyChart } from '$lib/components/dashboard/charts/occupancy';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import Select from '$lib/components/Select.svelte';
	import { getAddress } from '$lib/definitions/property';
	import { getLabel } from '$lib/definitions/unit';
	import type { filterSchema } from '$lib/server/trpc/charts';
	import { forceDateToInput } from '$lib/utils/common';
	import { subMonths } from 'date-fns';
	import type { z } from 'zod';
	import type { Load } from './dashboard';

	const defaultRange = 6;
	const getRange = (months: number) => ({
		// TODO use UTC, fns
		start: subMonths(new Date(Date.now()), months),
		end: new Date(Date.now()),
	});

	type Filter = z.infer<typeof filterSchema>;

	export const load: Load = async ({ params }) => {
		const defaultFilter: Filter = {
			propertyId: null,
			unitId: null,
			clientId: params.id,
			...getRange(defaultRange),
		};

		const [client, income, expenses, occupancy] = await Promise.all([
			trpc.query('clients:dashboard', params.id), // TODO use read?
			trpc.query('charts:income', {
				...defaultFilter,
			}),
			trpc.query('charts:expenses', {
				...defaultFilter,
			}),
			trpc.query('charts:occupancy', {
				...defaultFilter,
			}),
		]);
		return {
			props: {
				client,
				income,
				filter: defaultFilter,
				expenses,
				occupancy,
			},
		};
	};
</script>

<script lang="ts">
	export let client: InferQueryOutput<'clients:dashboard'>;
	export let income: InferQueryOutput<'charts:income'>;
	export let expenses: InferQueryOutput<'charts:expenses'>;
	export let occupancy: InferQueryOutput<'charts:occupancy'>;
	export let filter: Filter;

	interface Option {
		value: string | null;
		label: string;
	}

	const rangeOptions = [
		{ value: 3, label: 'Last 3 months' },
		{ value: 6, label: 'Last 6 months' }, // rethink selected vs bind
		{ value: 12, label: 'Last 12 months' },
		{ value: 0, label: 'Custom' },
	];

	const properties = client.properties.map((property) => ({
		value: property.id,
		label: getAddress(property),
	}));

	const propertyOptions = [
		{ value: null, label: 'All properties' },
		...properties,
	];

	const getUnitOptions = (newPropertyId: Option['value']): Option[] => {
		const defaultUnit = { value: null, label: 'All units' };
		if (!newPropertyId) return [defaultUnit];

		const newProperty = client.properties.find(
			(property) => property.id === newPropertyId,
		);

		const newUnits = newProperty
			? newProperty.units.map((unit) => ({
					value: unit.id,
					label: getLabel(unit),
			  }))
			: [defaultUnit];

		return [defaultUnit, ...newUnits];
	};

	let selectedRange = defaultRange;
	let selectedProperty: Option['value'] = null;
	let selectedUnit: Option['value'] = null;
	$: unitOptions = getUnitOptions(selectedProperty);
	$: startInput = forceDateToInput(filter.start);
	$: endInput = forceDateToInput(filter.end);
	const handleFilter = async (newFilter: Filter) => {
		console.log({ newFilter }, 'dashboard.svelte ~ 116');
		[income, expenses, occupancy] = await Promise.all([
			trpc.query('charts:income', newFilter),
			trpc.query('charts:expenses', newFilter),
			trpc.query('charts:occupancy', newFilter),
		]);
		filter = newFilter;
	};
	let incomeGroupBy: 'ratio' | 'property' = 'ratio';
</script>

<div class="mx-auto flex max-w-screen-lg flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="prose">
		<h1>Dashboard</h1>
	</div>
	<div class="flex max-w-screen-lg flex-col justify-between gap-3 md:flex-row">
		<!-- Date Filters -->
		<div class="flex flex-col gap-1 md:w-3/5 md:flex-row">
			<!-- Range -->
			<div class="md:w-1/2">
				<!-- rethink bind -->
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
				<!-- Start -->
				<input
					type="date"
					name="start"
					class="date-input"
					value={startInput}
					on:change={(e) => {
						const newDate = e.currentTarget.valueAsDate;
						if (newDate) {
							selectedRange = 0;
							handleFilter({
								...filter,
								start: newDate,
							});
						}
					}}
				/>

				<!-- End -->
				<input
					type="date"
					name="end"
					class="date-input"
					value={endInput}
					on:change={(e) => {
						const newDate = e.currentTarget.valueAsDate;
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
		</div>

		<!-- Property/Unit Filters -->
		<div class="flex flex-col gap-2 md:w-1/2 md:flex-row">
			<!-- Property -->
			<div class="md:w-2/3">
				<Select
					bind:current={selectedProperty}
					options={propertyOptions}
					on:select={async (e) => {
						selectedProperty = e.detail.value;
						selectedUnit = null;
						await handleFilter({
							...filter,
							propertyId: selectedProperty,
							unitId: null,
						});
						if (e.detail.value) {
							incomeGroupBy = 'ratio';
						}
					}}
				/>
			</div>

			<!-- Unit -->
			<div class="md:w-1/3">
				<Select
					bind:current={selectedUnit}
					options={unitOptions}
					disabled={!selectedProperty}
					on:select={async (e) => {
						handleFilter({
							...filter,
							unitId: e.detail.value,
						});
					}}
				/>
			</div>
		</div>
	</div>

	<!-- Income Chart -->
	<DashCard title="Rent Income" subtitle="The total amount of rent due.">
		<div slot="groupBy">
			<Select
				title="Group By"
				current={incomeGroupBy}
				disabled={!!selectedProperty || !!selectedUnit}
				options={[
					{ label: 'Ratio', value: 'ratio' },
					{
						label: 'Property',
						value: 'property',
						disabled: !!selectedProperty,
					},
				]}
				on:select={(e) => {
					if (e.detail.value === 'ratio' || e.detail.value === 'property') {
						incomeGroupBy = e.detail.value;
					}
				}}
			/>
		</div>
		<Chart let:height let:width>
			<canvas
				{height}
				{width}
				use:incomeChart={{ data: income, groupBy: incomeGroupBy }}
			/>
		</Chart>
	</DashCard>

	<!-- Expenses Chart -->
	<DashCard
		title="Expenses"
		subtitle="The total amount of expenses."
		empty={expenses.length < 1}
	>
		<Chart let:height let:width>
			<canvas {height} {width} use:expensesChart={expenses} />
		</Chart>
	</DashCard>

	<!-- Occupancy Chart -->
	<DashCard
		title="Occupancy"
		subtitle="The percentage of units that are empty."
		empty={occupancy.length < 1}
	>
		<Chart let:height let:width>
			<canvas {height} {width} use:occupancyChart={occupancy} />
		</Chart>
	</DashCard>
</div>

<style lang="postcss">
	.date-input {
		@apply block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
</style>
