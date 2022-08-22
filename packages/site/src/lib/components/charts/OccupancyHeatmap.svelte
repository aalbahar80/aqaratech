<script lang="ts">
	// Frappe: https://frappe.io/charts/docs/basic/heatmap
	// Layercake alternative: https://layercake.graphics/example-ssr/Calendar/

	import type { Occupancy } from '@self/sdk';
	import * as R from 'remeda';
	import Chart from 'svelte-frappe-charts';

	export let occupancy: Occupancy[];
	const colors = ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'];

	const oneYearAgo = new Date();
	oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

	const earliest = new Date(occupancy[0]!.date);
	const start = earliest > oneYearAgo ? oneYearAgo : earliest;

	$: data = {
		dataPoints: R.fromPairs(
			occupancy.map((o) => [o.date / 1000, o.occupiedPct]),
		),
		start,
		end: new Date(occupancy[occupancy.length - 1]!.date),
	};
</script>

<Chart type="heatmap" {data} {colors} />
