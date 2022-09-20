<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenuePie } from '$lib/components/charts/revenue-pie';
	import type { PaginatedLeaseInvoiceDto } from '$api/openapi';

	export let invoices: PaginatedLeaseInvoiceDto;

	$: datasets = [
		{
			label: 'Payment Status',
			data: [
				invoices.results
					.filter((i) => i.isPaid)
					.reduce((acc, i) => acc + i.amount, 0),
				invoices.results
					.filter((i) => !i.isPaid)
					.reduce((acc, i) => acc + i.amount, 0),
			],
			backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
		},
	];
</script>

<Chart let:height let:width>
	<canvas {height} {width} use:revenuePie={datasets} />
</Chart>
