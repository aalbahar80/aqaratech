<script lang="ts">
	import * as R from 'remeda';

	import type { LeaseInvoiceAggregateDto } from '$api/openapi';
	import type { PieConfig } from '$lib/models/interfaces/pie-config.interface';

	import Chart from '$lib/components/charts/Chart.svelte';
	import { pie } from '$lib/components/charts/pie';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';

	export let config: PieConfig;
	export let aggregate: LeaseInvoiceAggregateDto[];

	$: grouped = R.pipe(
		aggregate,
		R.groupBy(config.groupByFunc),
		R.omit(['null']),
		R.mapValues((x) => R.sumBy(x, (y) => y.sum.amount ?? 0)),
	);

	$: pieData = {
		labels: Object.keys(grouped).map((x) => config.labels[x]),
		datasets: [
			{
				label: '',
				data: Object.values(grouped),
				backgroundColor: Object.keys(grouped).map((x) => config.colors[x]),
			},
		],
	};
</script>

<ChartWrapper
	empty={Object.keys(grouped).length === 0}
	isFixedHeight={false}
>
	<slot />
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
