<script lang="ts">
	import ExpensesCard from '$lib/components/dashboard/cards/ExpensesCard.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import OccupancyCard from '$lib/components/dashboard/cards/OccupancyCard.svelte';
	import RevenueCard from '$lib/components/dashboard/cards/RevenueCard.svelte';
	import DashboardFilter from '$lib/components/dashboard/DashboardFilter.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import { create } from '$lib/utils/route-helpers';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		...(data.unit.label ? [['Label', data.unit.label]] : []),
		['Unit Number', data.unit.unitNumber],
		['Type', data.unit.type],
		['Market Rent', kwdFormat(data.unit.marketRent)],
		['Usage', data.unit.usage],
	] as [string, string | null][];
</script>

<UnitPage unit={data.unit} />
<DetailsPane {details} />
<LeaseList
	leases={data.leases}
	formUrl={(function () {
		const base = create({ entity: 'lease' });
		const searchParams = new URLSearchParams({
			portfolioId: data.unit.breadcrumbs.portfolio.id,
			propertyId: data.unit.propertyId,
			unitId: data.unit.id,
		});
		return `${base}?${searchParams.toString()}`;
	})()}
	showIndex
/>
<DashboardFilter
	properties={[]}
	units={[data.unit]}
	disabledPropertySelector
	disabledUnitSelector
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
