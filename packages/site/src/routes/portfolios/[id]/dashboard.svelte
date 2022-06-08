<script context="module" lang="ts">
	import { page } from '$app/stores';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import Chart from '$lib/components/Chart.svelte';
	import { expensesChart } from '$lib/components/dashboard/charts/expenses';
	import { incomeChart } from '$lib/components/dashboard/charts/income';
	import { netChart } from '$lib/components/dashboard/charts/net';
	import { occupancyChart } from '$lib/components/dashboard/charts/occupancy';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import { getExpenseChartStore } from '$lib/components/dashboard/stores/charts/expense';
	import { getIncomeChartStore } from '$lib/components/dashboard/stores/charts/income';
	import {
		getNetChartStore,
		getNetTableStore,
	} from '$lib/components/dashboard/stores/charts/net';
	import { getExpenseTableStore } from '$lib/components/dashboard/stores/tables/expense';
	import { getIncomeTableStore } from '$lib/components/dashboard/stores/tables/income';
	import Select from '$lib/components/Select.svelte';
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { Unit } from '$lib/models/classes/unit.class';
	import type { filterSchema } from '$lib/server/trpc/routers/owner/charts';
	import { forceDateToInput, getAddress } from '$lib/utils/common';
	import { subMonths } from 'date-fns';
	import { writable, type Writable } from 'svelte/store';
	import type { z } from 'zod';
	import type { Load } from './__types/index';

	const defaultRange = 6;
	const getRange = (months: number) => {
		const start = subMonths(new Date().setHours(0, 0, 0, 0), months);
		return {
			start: Date.UTC(
				new Date(start).getUTCFullYear(),
				new Date(start).getUTCMonth(),
				new Date(start).getUTCDate(),
			),
			end: Date.UTC(
				new Date(Date.now()).getUTCFullYear(),
				new Date(Date.now()).getUTCMonth(),
				new Date(Date.now()).getUTCDate(),
			),
		};
	};

	type Filter = z.infer<typeof filterSchema>;

	export const load: Load = async ({ params, fetch }) => {
		const defaultFilter: Filter = {
			propertyId: null,
			unitId: null,
			portfolioId: params.id,
			...getRange(defaultRange),
		};

		const [portfolio, income, expenses, occupancy] = await Promise.all([
			trpc(fetch).query('owner:charts:portfolio', { portfolioId: params.id }), // TODO use read?
			trpc(fetch).query('owner:charts:income', {
				...defaultFilter,
			}),
			trpc(fetch).query('owner:charts:expenses', {
				...defaultFilter,
			}),
			trpc(fetch).query('owner:charts:occupancy', {
				...defaultFilter,
			}),
		]);
		return {
			props: {
				portfolio,
				income,
				filter: defaultFilter,
				expenses,
				occupancy,
			},
		};
	};
</script>

<script lang="ts">
	export let portfolio: InferQueryOutput<'owner:charts:portfolio'>;
	export let income: InferQueryOutput<'owner:charts:income'>;
	export let expenses: InferQueryOutput<'owner:charts:expenses'>;
	export let occupancy: InferQueryOutput<'owner:charts:occupancy'>;
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

	const properties = portfolio.properties.map((property) => ({
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

		const newProperty = portfolio.properties.find(
			(property) => property.id === newPropertyId,
		);

		const newUnits = newProperty
			? newProperty.units.map((unit) => ({
					value: unit.id,
					label: Unit.getLabel(unit),
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
	let rangeValid = true;
	const handleFilter = async (newFilter: Filter) => {
		console.log({ newFilter }, 'dashboard.svelte ~ 116');
		rangeValid = newFilter.start <= newFilter.end;
		if (rangeValid) {
			[income, expenses, occupancy] = await Promise.all([
				trpc().query('owner:charts:income', newFilter),
				trpc().query('owner:charts:expenses', newFilter),
				trpc().query('owner:charts:occupancy', newFilter),
			]);
		}
		filter = newFilter;
	};
	const expensesGroupBy: Writable<'ratio' | 'property'> = writable('ratio');
	const incomeGroupBy: Writable<'ratio' | 'property'> = writable('ratio');

	// Expense
	const expenseData = writable(expenses);
	$: $expenseData = expenses;
	const expenseTableData = getExpenseTableStore(expenseData);
	const expenseChartData = getExpenseChartStore(
		expenseData,
		expensesGroupBy,
		$page.stuff.expenseMeta,
	);

	// Income
	const incomeData = writable(income);
	$: $incomeData = income;
	const incomeTableData = getIncomeTableStore(incomeData);
	const incomeChartData = getIncomeChartStore(incomeData, incomeGroupBy);

	// Net
	const netChartData = getNetChartStore(incomeData, expenseData);
	const netTableData = getNetTableStore(incomeData, expenseData);
</script>

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

			<!-- End -->
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
						$incomeGroupBy = 'ratio';
						$expensesGroupBy = 'ratio';
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
<DashCard
	title="Income"
	subtitle="Breakdown of rent income by status & property."
>
	<div slot="groupBy" class="flex w-64 pb-4">
		<span
			class="mt-1 inline-flex w-1/2 items-center break-words rounded-none rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 shadow-sm sm:text-sm"
		>
			Group By
		</span>
		<Select
			current={$incomeGroupBy}
			disabled={!!selectedProperty || !!selectedUnit}
			class="w-1/2 rounded-none rounded-r-md py-0 sm:text-sm"
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
					$incomeGroupBy = e.detail.value;
				}
			}}
		/>
	</div>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:incomeChart={$incomeChartData} />
		</Chart>
	</div>
	<div slot="data">
		<CondensedTable table={$incomeTableData} />
	</div>
</DashCard>

<!-- Expenses Chart -->
<DashCard
	title="Expenses"
	subtitle="The total amount of expenses by category & property."
	empty={expenses.length < 1}
>
	<div slot="groupBy" class="flex w-64 pb-4">
		<span
			class="mt-1 inline-flex w-1/2 items-center break-words rounded-none rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 shadow-sm sm:text-sm"
		>
			Group By
		</span>
		<Select
			current={$expensesGroupBy}
			disabled={!!selectedProperty || !!selectedUnit}
			class="w-1/2 rounded-none rounded-r-md py-0 sm:text-sm"
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
					$expensesGroupBy = e.detail.value;
				}
			}}
		/>
	</div>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:expensesChart={$expenseChartData} />
		</Chart>
	</div>
	<div slot="data">
		<CondensedTable table={$expenseTableData} />
	</div>
</DashCard>

<!-- Net Chart -->
<DashCard
	title="Net"
	subtitle="Total Rent Income vs Total Expenses"
	empty={expenses.length < 1 && income.length < 1}
>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:netChart={$netChartData} />
		</Chart>
	</div>
	<div slot="data">
		<CondensedTable table={$netTableData} />
	</div>
</DashCard>

<!-- Occupancy Chart -->
<DashCard
	title="Occupancy"
	subtitle="The percentage of empty units over time."
	empty={occupancy.length < 1}
	tabbed={false}
>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:occupancyChart={occupancy} />
		</Chart>
	</div>
</DashCard>

<style lang="postcss">
	.date-input {
		@apply block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
	.date-input-invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
