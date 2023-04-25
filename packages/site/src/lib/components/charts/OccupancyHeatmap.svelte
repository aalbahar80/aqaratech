<script lang="ts">
	import * as R from 'remeda';

	import type { Occupancy } from '$api/openapi';

	import FrappeChart from '$lib/components/charts/FrappeCharts/FrappeChart.svelte';
	import { getOneYearAgo } from '$lib/components/charts/utils/date-range';
	// Frappe: https://frappe.io/charts/docs/basic/heatmap
	// Example: https://github.dev/frappe/charts/blob/7adc904b08fbb45fb30372d9c6a3c3df43f80085/docs/index.html#L174
	// Layercake alternative: https://layercake.graphics/example-ssr/Calendar/

	export let occupancy: Occupancy[];
	export let title = '';
	export let shouldClamp = false;
	const colors = ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'];

	let innerWidth: number | undefined;
	$: isLargeScreen = innerWidth && innerWidth > 500;
	const oneYearAgo = getOneYearAgo();

	$: earliest = new Date(occupancy[0]!.date);
	$: start =
		shouldClamp && isLargeScreen && earliest > oneYearAgo
			? oneYearAgo
			: earliest;

	$: data = {
		dataPoints: R.fromPairs(
			occupancy.map((o) => [o.date / 1000, o.occupiedPct]),
		),
		start,
		end: new Date(occupancy[occupancy.length - 1]!.date),
	};
</script>

<svelte:window bind:innerWidth />

<p class="prose prose-base">
	{title}
</p>

{#key data}
	<div
		class="overflow-x-auto py-4"
		dir="ltr"
		lang="en"
	>
		<FrappeChart
			type="heatmap"
			{data}
			{colors}
			height={200}
			countLabel="%"
		/>
	</div>
{/key}
