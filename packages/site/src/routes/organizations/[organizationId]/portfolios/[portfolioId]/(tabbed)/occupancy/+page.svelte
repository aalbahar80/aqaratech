<script lang="ts">
	import OccupancyCard from '$lib/components/dashboard/cards/OccupancyCard.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<OccupancyCard
	occupancy={data.occupancy}
	futureOccupancy={data.futureOccupancy}
/>
