<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenueChart } from '$lib/components/charts/revenue';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import { getColor } from '$lib/utils/colors';
	import type { PageData } from './$types';
	import PieChart from './PieChart.svelte';

	export let data: PageData;

	$: barDatasets = [
		{
			label: 'Paid',
			borderColor: getColor(0, 2),
			data: data.income.paid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(0, 2),
			borderRadius: 10,
		},
		{
			label: 'Unpaid',
			borderColor: getColor(1, 2),
			data: data.income.unpaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, 2),
			borderRadius: 10,
		},
	];
</script>

<RangeSelect />

<a href="income/table">Table</a>

<PieChart income={data.income} />

<Chart let:height let:width>
	<canvas {height} {width} use:revenueChart={barDatasets} />
</Chart>
