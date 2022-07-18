<script lang="ts">
	import Chart from '$lib/components/Chart.svelte';
	import { revenueChart } from '$lib/components/dashboard/charts/revenue';
	import { getColor } from '$lib/config/constants';
	import type { PaginatedLeaseInvoiceDto } from '@self/sdk';

	export let invoices: PaginatedLeaseInvoiceDto;

	$: datasets = [
		{
			label: 'Paid',
			borderColor: getColor(0, 2),
			data: invoices.results.filter((i) => i.isPaid),
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'postAt',
			},
			backgroundColor: getColor(0, 2),
			borderRadius: 10,
		},
		{
			label: 'Unpaid',
			borderColor: getColor(1, 2),
			data: invoices.results.filter((i) => !i.isPaid),
			parsing: {
				yAxisKey: 'amount',
				xAxisKey: 'postAt',
			},
			backgroundColor: getColor(1, 2),
			borderRadius: 10,
		},
	];
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:revenueChart={datasets} />
</Chart>
