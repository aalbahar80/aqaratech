<script lang="ts">
	import type { IncomeByMonthDto } from '$api/openapi';
	import { revenuePie } from '$lib/components/charts/revenue-pie';
	import { getColor } from '$lib/utils/colors';
	import Chart from '$lib/components/charts/Chart.svelte';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';

	export let income: IncomeByMonthDto;

	$: paid = income.paid.reduce((acc, i) => acc + i.amount, 0);
	$: unpaid = income.unpaid.reduce((acc, i) => acc + i.amount, 0);

	$: pieDatasets = [
		{
			label: 'Payment Status',
			data: [paid, unpaid],
			backgroundColor: [getColor(0, 2), getColor(1, 2)],
		},
	];
</script>

<ChartWrapper
	title="Income: by Payment Status"
	subtitle="Total income by payment status for the selected period."
	empty={paid === 0 && unpaid === 0}
>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenuePie={pieDatasets} />
	</Chart>
</ChartWrapper>
