<script lang="ts">
	import type { Occupancy } from '$api/openapi';
	import OccupancyHeatmap from '$lib/components/charts/OccupancyHeatmap.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';

	export let occupancy: Occupancy[];
	export let futureOccupancy: Occupancy[];
</script>

<DashCard
	title="Occupancy"
	subtitle="Percentage of occupied units."
	empty={occupancy.length < 1}
>
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
</DashCard>
