<script lang="ts">
	import ExpensesCard from '$lib/components/dashboard/cards/ExpensesCard.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import OccupancyCard from '$lib/components/dashboard/cards/OccupancyCard.svelte';
	import RevenueCard from '$lib/components/dashboard/cards/RevenueCard.svelte';
	import DashboardFilter from '$lib/components/dashboard/DashboardFilter.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import PropertyPage from '$lib/components/property/PropertyPage.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
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
</script>

<PropertyPage property={data.property} />
<DetailsPane {details} />
<UnitsList units={data.units} />
<DashboardFilter
	properties={[data.property]}
	units={data.units.results}
	disabledPropertySelector
/>
<NetIncomeCard
	invoicesGrouped={data.invoicesGrouped}
	invoicesGroupedPaid={data.invoicesGroupedPaid}
	invoicesGroupedUnpaid={data.invoicesGroupedUnpaid}
	expensesGrouped={data.expensesGrouped}
/>
<RevenueCard
	invoices={data.invoices}
	invoicesGroupedPaid={data.invoicesGroupedPaid}
	invoicesGroupedUnpaid={data.invoicesGroupedUnpaid}
	disabledPropertyBreakdown
/>
<ExpensesCard expenses={data.expenses} categories={data.categories} />

<OccupancyCard
	occupancy={data.occupancy}
	futureOccupancy={data.futureOccupancy}
/>
