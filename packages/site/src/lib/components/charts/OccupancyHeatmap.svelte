<script lang="ts">
	import type { Occupancy } from '@self/sdk';
	import * as R from 'remeda';
	import Chart from 'svelte-frappe-charts';

	export let occupancy: Occupancy[];
	const colors = ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'];

	$: data = {
		dataPoints: R.fromPairs(
			occupancy.map((o) => [o.date / 1000, o.occupiedPct]),
		),
		start: new Date(occupancy[0]!.date),
		end: new Date(occupancy[occupancy.length - 1]!.date),
	};
</script>

<Chart type="heatmap" {data} {colors} />
