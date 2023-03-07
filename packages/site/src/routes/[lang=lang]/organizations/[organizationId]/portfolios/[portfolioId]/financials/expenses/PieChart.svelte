<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import Chart from '$lib/components/charts/Chart.svelte';
	import { pie } from '$lib/components/charts/pie';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { expenseTreeCat } from '$lib/stores/expense-tree-cat';
	import { getColor } from '$lib/utils/colors';

	export let empty: boolean;

	// array of first level children
	$: firstLevel =
		$expenseTreeCat.children?.map((c) => ({
			id: c.data.id,
			label: c.data.label,
			value: c.value ?? 0,
		})) ?? [];

	$: pieData = {
		labels: firstLevel.map((e) => e.label),
		datasets: [
			{
				label: '',
				// data is an array of the root values of the expenses. Each root value
				data: firstLevel.map((e) => e.value),
				backgroundColor: Array.from({ length: firstLevel.length }, (_, i) =>
					getColor(i, firstLevel.length),
				),
			},
		],
	};
</script>

<ChartWrapper
	title={$L.charts.expensesCategoryTreeMap.title()}
	subtitle={$L.charts.expensesCategoryTreeMap.subtitle()}
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
