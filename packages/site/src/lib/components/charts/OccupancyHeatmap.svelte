<script lang="ts">
	// Frappe: https://frappe.io/charts/docs/basic/heatmap
	// Example: https://github.dev/frappe/charts/blob/7adc904b08fbb45fb30372d9c6a3c3df43f80085/docs/index.html#L174
	// Layercake alternative: https://layercake.graphics/example-ssr/Calendar/

	// forked from svelte-frappe-charts to add functionality (mainly countLabel prop) - reuse package once functionality is merged
	import FrappeChart from '$lib/components/charts/FrappeChart.svelte';
	import type { Occupancy } from '@self/sdk';
	import * as R from 'remeda';

	export let occupancy: Occupancy[];
	const colors = ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'];

	let innerWidth: number | undefined;
	$: isLargeScreen = innerWidth && innerWidth > 500;
	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

	$: earliest = new Date(occupancy[0]!.date);
	$: start = isLargeScreen && earliest > oneYearAgo ? oneYearAgo : earliest;

	$: data = {
		dataPoints: R.fromPairs(
			occupancy.map((o) => [o.date / 1000, o.occupiedPct]),
		),
		start,
		end: new Date(occupancy[occupancy.length - 1]!.date),
	};
</script>

<svelte:window bind:innerWidth />

{#key data}
	<div class="overflow-x-auto py-4">
		<FrappeChart type="heatmap" countLabel="%" />
	</div>
{/key}
