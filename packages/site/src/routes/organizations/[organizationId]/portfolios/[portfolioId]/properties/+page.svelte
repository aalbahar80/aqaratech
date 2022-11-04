<script lang="ts">
	import OccupancyCard from '$lib/components/dashboard/cards/OccupancyCard.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<PropertyList properties={data.properties} />

<OccupancyCard
	occupancy={data.occupancy}
	futureOccupancy={data.futureOccupancy}
/>
