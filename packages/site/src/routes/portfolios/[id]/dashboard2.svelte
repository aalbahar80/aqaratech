<script context="module" lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { netChart } from '$lib/components/dashboard/charts/net';
	import DashboardFilter from '$lib/components/dashboard/DashboardFilter.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import { getColor } from '$lib/config/constants';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		stuff,
		params,
		url,
	}: LoadEvent<{ id: string }>) => {
		const portfolioId = params.id;
		const filter = {
			portfolioId,
			propertyId: url.searchParams.get('propertyId') || undefined,
			unitId: url.searchParams.get('unitId') || undefined,
			start: url.searchParams.get('start') || undefined,
			end: url.searchParams.get('end') || undefined,
		};

		const [properties, units, income, expenses] = await Promise.all([
			stuff.api!.portfolios.findProperties({ id: portfolioId }),
			stuff.api!.portfolios.findUnits({ id: portfolioId }),

			stuff.api!.analytics.getIncomeByMonth(filter),
			stuff.api!.analytics.getExpensesByMonth(filter),
		]);

		return { props: { properties, units, income, expenses } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let properties: Prop['properties'];
	export let units: Prop['units'];

	export let income: Prop['income'];
	export let expenses: Prop['expenses'];

	$: datasets = [
		{
			label: 'Income',
			borderColor: getColor(0, 2),
			data: income,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(0, 2),
			// borderRadius: 10,
		},
		{
			label: 'Expenses',
			borderColor: getColor(1, 2),
			data: expenses,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			// borderRadius: 10,
		},
	];
</script>

<div class="prose">
	<h1>Dashboard</h1>
</div>

<DashboardFilter {properties} {units} />

<!-- Net Chart -->
<DashCard
	title="Net"
	subtitle="Total Rent Income vs Total Expenses"
	empty={expenses.length < 1 && income.length < 1}
>
	<div slot="chart">
		<Chart let:height let:width>
			<canvas {height} {width} use:netChart={datasets} />
		</Chart>
	</div>
	<!-- <div slot="data">
		<CondensedTable table={$netTableData} />
	</div> -->
</DashCard>
