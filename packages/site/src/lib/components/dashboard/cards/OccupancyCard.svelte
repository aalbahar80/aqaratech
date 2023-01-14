<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import OccupancyHeatmap from '$lib/components/charts/OccupancyHeatmap.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';

	import type { Occupancy } from '$api/openapi';

	export let occupancy: Occupancy[];
	export let futureOccupancy: Occupancy[];
</script>

<DashCard
	title={$L.charts.occupancyHeatmap.title()}
	subtitle={$L.charts.occupancyHeatmap.subtitle()}
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
