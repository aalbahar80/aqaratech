<script lang="ts">
	import OccupancyHeatmap from '$lib/components/charts/OccupancyHeatmap.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import type { Occupancy } from '@self/sdk';

	export let occupancy: Occupancy[];
</script>

<DashCard
	title="Occupancy"
	subtitle=""
	empty={occupancy.length < 1}
	tabbed={false}
>
	<div slot="chart">
		<div class="overflow-x-auto">
			<OccupancyHeatmap {occupancy} />
		</div>
	</div>
</DashCard>
