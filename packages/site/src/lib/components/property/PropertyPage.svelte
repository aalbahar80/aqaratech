<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import type { ByMonthDto, PaginatedUnitDto, PropertyDto } from '@self/sdk';

	export let property: PropertyDto;
	export let units: PaginatedUnitDto;

	export let income: ByMonthDto[];
	export let expenses: ByMonthDto[];

	let details: [string, string | null][];
	$: details = [
		// ['Address', property.address],
		['Area', property.area],
		['Block', property.block],
		['Avenue', property.avenue],
		['Street', property.street],
		['Number', property.number],
		['Parcel', property.parcel],
		['Paci', property.paci],
	];
</script>

<Heading title="Property" id={property.id} entity="properties">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={property.breadcrumbs} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<UnitsList {units} />

<NetIncomeCard {income} {expenses} />
