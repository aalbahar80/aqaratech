<script lang="ts">
	import OccupancyHeatmap from '$lib/components/charts/OccupancyHeatmap.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import type { Occupancy } from '@self/sdk';

	export let occupancy: Occupancy[];
</script>

<DashCard
	title="Occupancy"
	subtitle="Percentage of occupied units"
	empty={occupancy.length < 1}
	tabbed={false}
	chartHeight={1000}
>
	<div slot="chart">
		<OccupancyHeatmap {occupancy} />
		<div class="py-8" />
		<OccupancyHeatmap
			{occupancy}
			title="Expected occupancy for the upcoming year"
		/>
	</div>
</DashCard>
