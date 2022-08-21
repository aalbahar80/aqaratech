<script lang="ts">
	import OccupancyHeatmap from '$lib/components/charts/OccupancyHeatmap.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import type { Occupancy } from '@self/sdk';

	export let occupancy: Occupancy[];
</script>

<DashCard
	title="Occpancy"
	subtitle="The total amount of expenses by category & property."
	empty={occupancy.length < 1}
>
	<div slot="chart">
		<OccupancyHeatmap {occupancy} />
	</div>
</DashCard>
