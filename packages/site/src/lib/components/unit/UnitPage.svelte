<script lang="ts">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import type { UnitOneDto } from '@self/sdk';
	import FaSolidBath from '~icons/fa-solid/bath';
	import Fa6SolidBed from '~icons/fa6-solid/bed';
	import Fa6SolidElevator from '~icons/fa6-solid/elevator';
	import GisMeasure from '~icons/gis/measure';

	export let data: UnitOneDto;

	let details: [string, string | null][];
	$: details = [
		['Unit Number', data.unitNumber],
		['Type', data.type],
		['Market Rent', kwdFormat(data.marketRent)],
		['Usage', data.usage],
	];

	const icons = [
		{
			label: data.bed,
			icon: Fa6SolidBed,
			tooltip: 'Bedrooms',
		},
		{
			label: data.bath,
			icon: FaSolidBath,
			tooltip: 'Bathrooms',
		},
		{
			label: `${data.size?.toLocaleString()} m²`,
			tooltip: 'Size',
			icon: GisMeasure,
		},
		{
			label: data.floor,
			icon: Fa6SolidElevator,
			tooltip: 'Elevator',
		},
	];
</script>

<Heading title="Unit" id={data.id} entity="units" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={data.breadcrumbs} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<LeaseList leases={data.leases} showIndex />
