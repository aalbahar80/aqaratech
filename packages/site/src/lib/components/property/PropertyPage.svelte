<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { PropertyDto } from '@self/sdk';
	import { CreditCard } from '@steeze-ui/heroicons';

	export let property: PropertyDto;

	$: details = [
		...(property.label ? [['Label', property.label]] : []),
		['Address', property.breadcrumbs.property.label],
		['Area', property.area],
		['Block', property.block],
		['Avenue', property.avenue],
		['Street', property.street],
		['Number', property.number],
		['Parcel', property.parcel],
		['Paci', property.paci],
	] as [string, string | null][];
</script>

<Heading
	title="Property"
	id={property.id}
	entity="properties"
	extraMenuItems={[
		{
			icon: CreditCard,
			label: 'Create expense',
			href: `/expenses/new?portfolioId=${property.portfolioId}&propertyId=${property.id}`,
		},
	]}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={property.breadcrumbs} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<slot />
