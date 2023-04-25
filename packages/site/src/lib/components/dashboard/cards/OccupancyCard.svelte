<script lang="ts">
	import type { Occupancy } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import OccupancyHeatmap from '$lib/components/charts/OccupancyHeatmap.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';

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
		title={$L.charts.occupancyHeatmap.previous()}
	/>
	<div class="py-8" />
	<OccupancyHeatmap
		occupancy={futureOccupancy}
		title={$L.charts.occupancyHeatmap.next()}
	/>
</DashCard>
