<script lang="ts">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import { faBath } from '@fortawesome/free-solid-svg-icons/faBath';
	import { faBed } from '@fortawesome/free-solid-svg-icons/faBed';
	import { faElevator } from '@fortawesome/free-solid-svg-icons/faElevator';
	import { faMaximize } from '@fortawesome/free-solid-svg-icons/faMaximize';

	type Unit =
		| InferQueryOutput<'units:read'>
		| InferQueryOutput<'owner:units:read'>;
	export let unit: Unit;
	export let hideActions = false;

	let details: [string, string | null][];
	$: details = [
		['Unit Number', unit.unitNumber],
		['Type', unit.type],
		['Market Rent', kwdFormat(unit.marketRent)],
		['Usage', unit.usage || '-'],
	];

	const icons = [
		{
			label: unit.bed,
			icon: faBed,
			tooltip: 'Bedrooms',
		},
		{
			label: unit.bath,
			icon: faBath,
			tooltip: 'Bathrooms',
		},
		{
			label: `${unit.size?.toLocaleString()} m²`,
			icon: faMaximize,
			tooltip: 'Size',
		},
		{
			label: unit.floor,
			icon: faElevator,
			tooltip: 'Elevator',
		},
	];
</script>

<Heading title="Unit" id={unit.id} entity="units" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb
			crumbs={hideActions
				? [['properties', unit.property.id]]
				: [
						['clients', unit.property.clientId],
						['properties', unit.property.id],
				  ]}
		/>
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<LeaseList leases={unit.leases} showIndex />
