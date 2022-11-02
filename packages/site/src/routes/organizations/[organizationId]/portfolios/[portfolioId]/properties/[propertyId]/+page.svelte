<script lang="ts">
	import OccupancyCard from '$lib/components/dashboard/cards/OccupancyCard.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import PropertyPage from '$lib/components/property/PropertyPage.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import { setContext } from 'svelte';
	import type { PageData } from './$types';

	$: details = [
		...(data.property.label ? [['Label', data.property.label]] : []),
		['Address', data.property.breadcrumbs.property.label],
		['Area', data.property.area],
		['Block', data.property.block],
		['Avenue', data.property.avenue],
		['Street', data.property.street],
		['Number', data.property.number],
		['Parcel', data.property.parcel],
		['Paci', data.property.paci],
	] as [string, string | null][];

	export let data: PageData;

	setContext('portfolio', {
		...data.property.breadcrumbs.portfolio,
	});
</script>

<PropertyPage property={data.property} />

<DetailsPane {details} />

<UnitsList units={data.units} />

<OccupancyCard
	occupancy={data.occupancy}
	futureOccupancy={data.futureOccupancy}
/>
