<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { netChart } from '$lib/components/charts/net';
	import { getColor } from '$lib/utils/colors';
	import type { ByMonthDto } from '$api/openapi';

	export let invoicesGrouped: ByMonthDto[];
	export let invoicesGroupedPaid: ByMonthDto[];
	export let invoicesGroupedUnpaid: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];

	const datasetCount = 4;

	$: datasets = [
		{
			label: 'Total Rent',
			borderColor: getColor(0, datasetCount),
			data: invoicesGrouped,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(0, datasetCount),
			// borderRadius: 10,
			borderDash: [5, 5],
		},
		{
			label: 'Collected',
			borderColor: getColor(1, datasetCount),
			data: invoicesGroupedPaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(1, datasetCount),
			// borderRadius: 10,
		},
		{
			label: 'Uncollected',
			borderColor: getColor(2, datasetCount),
			data: invoicesGroupedUnpaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(2, datasetCount),
			// borderRadius: 10,
		},
		{
			label: 'Expenses',
			borderColor: getColor(3, datasetCount),
			data: expensesGrouped,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			backgroundColor: getColor(3, datasetCount),
			// borderRadius: 10,
		},
	];
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:netChart={datasets} />
</Chart>
