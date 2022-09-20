<script lang="ts">
	import OccupancyHeatmap from '$lib/components/charts/OccupancyHeatmap.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import type { Occupancy } from '$api/openapi';

	export let occupancy: Occupancy[];
	export let futureOccupancy: Occupancy[];
</script>

<DashCard
	title="Occupancy"
	subtitle="Percentage of occupied units."
	empty={occupancy.length < 1}
	tabbed={false}
>
	<div slot="chart">
		<OccupancyHeatmap
			{occupancy}
			shouldClamp
			title="Historical occupancy rates"
		/>
		<div class="py-8" />
		<OccupancyHeatmap
			occupancy={futureOccupancy}
			title="Expected occupancy for the upcoming year"
		/>
	</div>
</DashCard>
