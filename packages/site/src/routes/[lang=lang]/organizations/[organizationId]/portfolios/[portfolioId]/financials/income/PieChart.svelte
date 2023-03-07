<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { pie } from '$lib/components/charts/pie';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { getColor } from '$lib/utils/colors';

	export let paid: number;
	export let unpaid: number;
	export let empty: boolean;

	$: pieData = {
		labels: [$L.badge.paid(), $L.badge.unpaid()],
		datasets: [
			{
				label: '',
				data: [paid, unpaid],
				backgroundColor: [getColor(0, 2), getColor(1, 2)],
			},
		],
	};
</script>

<ChartWrapper
	title={$L.charts.incomePie.title()}
	subtitle={$L.charts.incomePie.subtitle()}
	{empty}
>
	<Chart
		let:height
		let:width
	>
		<canvas
			{height}
			{width}
			use:pie={pieData}
		/>
	</Chart>
</ChartWrapper>
