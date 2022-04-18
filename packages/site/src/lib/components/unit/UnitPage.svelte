<script lang="ts">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import {
		faBath,
		faBed,
		faElevator,
		faMaximize,
	} from '@fortawesome/free-solid-svg-icons';
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
		['Created on', dateFormat(unit.createdAt)],
		['Last updated', unit.updatedAt.toLocaleString()],
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

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading title="Unit" id={unit.id} entity="units" {icons} {hideActions}>
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
	<LeaseList
		{hideActions}
		leases={unit.leases}
		newHref={`/new/leases?unitId=${unit.id}`}
		showIndex
	/>
</div>
