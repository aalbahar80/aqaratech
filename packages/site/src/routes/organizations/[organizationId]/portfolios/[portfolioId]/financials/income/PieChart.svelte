<script lang="ts">
	import Chart from '$lib/components/charts/Chart.svelte';
	import { revenuePie } from '$lib/components/charts/revenue-pie';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { getColor } from '$lib/utils/colors';

	export let paid: number;
	export let unpaid: number;
	export let empty: boolean;

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
	{empty}
>
	<Chart let:height let:width>
		<canvas {height} {width} use:revenuePie={pieDatasets} />
	</Chart>
</ChartWrapper>
