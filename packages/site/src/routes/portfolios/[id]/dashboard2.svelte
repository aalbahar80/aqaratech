<script context="module" lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { netChart, type DataSet } from '$lib/components/dashboard/charts/net';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import { getColor } from '$lib/config/constants';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ stuff, params }: LoadEvent<{ id: string }>) => {
		const portfolioId = params.id;

		const [income, expenses] = await Promise.all([
			stuff.api!.analytics.getIncomeByMonth({ portfolioId }),
			stuff.api!.analytics.getExpensesByMonth({ portfolioId }),
		]);

		return { props: { income, expenses } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let income: Prop['income'];
	export let expenses: Prop['expenses'];

	const datasets: DataSet[] = [
		{
			label: 'Income',
			borderColor: getColor(1, 2),
			data: income,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			// borderRadius: 10,
		},
		{
			label: 'Expenses',
			borderColor: getColor(2, 2),
			data: expenses,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(2, 2),
			// borderRadius: 10,
		},
	];
</script>

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
