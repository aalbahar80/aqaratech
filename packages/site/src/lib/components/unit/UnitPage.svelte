<script lang="ts">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import type { UnitDto } from '@self/sdk';
	import FaSolidBath from '~icons/fa-solid/bath';
	import Fa6SolidBed from '~icons/fa6-solid/bed';
	import Fa6SolidElevator from '~icons/fa6-solid/elevator';
	import GisMeasure from '~icons/gis/measure';

	export let unit: UnitDto;

	let details: [string, string | null][];
	$: details = [
		['Unit Number', unit.unitNumber],
		['Type', unit.type],
		['Market Rent', kwdFormat(unit.marketRent)],
		['Usage', unit.usage],
	];

	const icons = [
		{
			label: unit.bed,
			icon: Fa6SolidBed,
			tooltip: 'Bedrooms',
		},
		{
			label: unit.bath,
			icon: FaSolidBath,
			tooltip: 'Bathrooms',
		},
		{
			label: `${unit.size?.toLocaleString()} m²`,
			tooltip: 'Size',
			icon: GisMeasure,
		},
		{
			label: unit.floor,
			icon: Fa6SolidElevator,
			tooltip: 'Elevator',
		},
	];
</script>

<Heading title="Unit" id={unit.id} entity="units" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={unit.breadcrumbs} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<slot />
