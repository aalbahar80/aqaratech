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
	chartHeight={500}
>
	<div slot="chart">
		{#key occupancy}
			<div class="overflow-x-auto py-4">
				<OccupancyHeatmap {occupancy} />
			</div>
		{/key}
	</div>
</DashCard>
