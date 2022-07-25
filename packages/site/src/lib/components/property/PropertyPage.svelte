<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { PropertyDto } from '@self/sdk';

	export let property: PropertyDto;

	$: details = [
		// ['Address', property.address],
		['Area', property.area],
		['Block', property.block],
		['Avenue', property.avenue],
		['Street', property.street],
		['Number', property.number],
		['Parcel', property.parcel],
		['Paci', property.paci],
	] as [string, string | null][];
</script>

<Heading title="Property" id={property.id} entity="properties">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={property.breadcrumbs} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<slot />
