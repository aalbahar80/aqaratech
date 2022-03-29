<script context="module" lang="ts">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import { expensesChart } from '$lib/components/dashboard/charts/expenses';
	import { incomeChart } from '$lib/components/dashboard/charts/income';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import { getAddress } from '$lib/definitions/property';
	import { getLabel } from '$lib/definitions/unit';
	import type { filterSchema } from '$lib/server/trpc/charts';
	import { forceDateToInput } from '$lib/utils/common';
	import { subMonths } from 'date-fns';
	import Select from 'svelte-select';
	import type { z } from 'zod';
	// import Select from 'svelte-select/src/Select.svelte';
	import type { Load } from './dashboard';

	type Filter = z.infer<typeof filterSchema>;

	export const load: Load = async ({ params }) => {
		const defaultFilter: Filter = {
			// TODO use UTC, fns
			start: subMonths(new Date(Date.now()), 6),
			end: new Date(Date.now()),
			propertyId: undefined,
			unitId: undefined,
			clientId: params.id,
		};

		const [client, income, expenses] = await Promise.all([
			trpc.query('clients:dashboard', params.id), // TODO use read?
			trpc.query('charts:income', {
				...defaultFilter,
			}),
			trpc.query('charts:expenses', {
				...defaultFilter,
			}),
		]);
		return { props: { client, income, filter: defaultFilter, expenses } };
	};
</script>

<script lang="ts">
	export let client: InferQueryOutput<'clients:dashboard'>;
	export let income: InferQueryOutput<'charts:income'>;
	export let expenses: InferQueryOutput<'charts:expenses'>;
	export let filter: Filter;

	type Option = { value: string; label: string };
	type SelectedOption = Option | null | undefined;

	const predefinedRanges = [3, 6, 12].map((months) => ({
		label: `Last ${months} months`,
		value: {
			start: subMonths(new Date(Date.now()), months),
			end: new Date(Date.now()),
		},
	}));
	const rangeOptions = [...predefinedRanges, { value: null, label: 'Custom' }];

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

	let selectedRange = rangeOptions[1];
	let selectedProperty: SelectedOption;
	let selectedUnit: SelectedOption;
	$: unitOptions = getUnitOptions(selectedProperty);
	$: startInput = forceDateToInput(filter.start);
	$: endInput = forceDateToInput(filter.end);
	const handleFilter = async (newFilter: Filter) => {
		[income, expenses] = await Promise.all([
			trpc.query('charts:income', newFilter),
			trpc.query('charts:expenses', newFilter),
		]);
		filter = newFilter;
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
					bind:value={selectedRange}
					isClearable={false}
					showIndicator
					isSearchable={false}
					on:select={(e) => {
						if (e.detail.value) {
							handleFilter({
								...filter,
								start: e.detail.value.start,
								end: e.detail.value.end,
							});
						}
					}}
				/>
			</div>
			<input
				type="date"
				name="start"
				class="date-input"
				value={startInput}
				on:change={(e) => {
					const newDate = e.currentTarget.valueAsDate;
					if (newDate) {
						selectedRange = rangeOptions[rangeOptions.length - 1];
						handleFilter({
							...filter,
							start: newDate,
						});
					}
				}}
			/>
			<input
				type="date"
				name="end"
				class="date-input"
				value={endInput}
				on:change={(e) => {
					const newDate = e.currentTarget.valueAsDate;
					if (newDate) {
						selectedRange = rangeOptions[rangeOptions.length - 1];
						handleFilter({
							...filter,
							end: newDate,
						});
					}
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
						handleFilter({
							...filter,
							propertyId: null,
							unitId: null,
						});
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
							unitId: e.detail.value,
						});
					}}
					on:clear={() => {
						handleFilter({
							...filter,
							unitId: null,
						});
					}}
				/>
			</div>
		</div>
	</div>

	<!-- Income Chart -->
	<DashCard
		title="Rent Income"
		subtitle="The total amount of rent due."
		empty={income.length < 1}
	>
		<canvas width="400" height="400" use:incomeChart={income} />
	</DashCard>

	<!-- Expenses Chart -->
	<DashCard title="Expenses" subtitle="" empty={expenses.length < 1}>
		<canvas width="400" height="400" use:expensesChart={expenses} />
	</DashCard>
</div>

<style lang="postcss">
	.date-input {
		@apply block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
</style>
