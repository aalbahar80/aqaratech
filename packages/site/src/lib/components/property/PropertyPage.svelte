<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import type { PropertyOneDto } from '@self/sdk';

	export let data: PropertyOneDto;

	let details: [string, string | null][];
	$: details = [
		// ['Address', data.address],
		['Area', data.area],
		['Block', data.block],
		['Avenue', data.avenue],
		['Street', data.street],
		['Number', data.number],
		['Parcel', data.parcel],
		['Paci', data.paci],
	];
</script>

<Heading title="Property" id={data.id} entity="properties">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={data.breadcrumbs} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<UnitsList units={data.units} />
