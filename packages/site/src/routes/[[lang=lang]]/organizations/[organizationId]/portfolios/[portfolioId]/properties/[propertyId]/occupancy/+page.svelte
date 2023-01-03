<script lang="ts">
	import type { PageData } from './$types';

	import OccupancyCard from '$lib/components/dashboard/cards/OccupancyCard.svelte';

	export let data: PageData;
</script>

<OccupancyCard
	occupancy={data.occupancy}
	futureOccupancy={data.futureOccupancy}
/>
