<script lang="ts">
	import type { ByMonthDto } from '$api/openapi';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { netChart } from '$lib/components/charts/net';
	import { COLORS } from '$lib/utils/colors';

	export let invoicesGrouped: ByMonthDto[];
	export let invoicesGroupedPaid: ByMonthDto[];
	export let invoicesGroupedUnpaid: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];

	const tension = 0.25;

	$: datasets = [
		{
			label: 'Total Rent',
			data: invoicesGrouped,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			// borderRadius: 10,
			borderDash: [5, 5],
			backgroundColor: COLORS.GRAY,
			borderColor: COLORS.GRAY,
			tension,
		},
		{
			label: 'Collected',
			data: invoicesGroupedPaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			// borderRadius: 10,
			backgroundColor: COLORS.BLUE,
			borderColor: COLORS.BLUE,
			tension,
		},
		{
			label: 'Uncollected',
			data: invoicesGroupedUnpaid,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			// borderRadius: 10,
			backgroundColor: COLORS.GRAY,
			borderColor: COLORS.GRAY,
			tension,
		},
		{
			label: 'Expenses',
			data: expensesGrouped,
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'date',
			},
			// borderRadius: 10,
			backgroundColor: COLORS.RED,
			borderColor: COLORS.RED,
			tension,
		},
	];
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:netChart={datasets} />
</Chart>
