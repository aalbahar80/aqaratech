<script lang="ts">
	import type { Occupancy } from '@self/sdk';
	import Chart from 'svelte-frappe-charts';

	export let occupancy: Occupancy[];
	const colors = ['#ebedf0', '#c0ddf9', '#73b3f3', '#3886e1', '#17459e'];

	const dataPoints = occupancy.map((o) => ({
		[o.date]: o.occupiedPct,
	}));

	let data = {
		dataPoints,
		start: new Date('2021-07-29'),
		end: new Date('2023-07-29'),
	};
</script>

<Chart type="heatmap" {data} {colors} />
