<script lang="ts">
	import ExpensesCard from '$lib/components/dashboard/cards/ExpensesCard.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import OccupancyCard from '$lib/components/dashboard/cards/OccupancyCard.svelte';
	import RevenueCard from '$lib/components/dashboard/cards/RevenueCard.svelte';
	import DashboardFilter from '$lib/components/dashboard/DashboardFilter.svelte';
	import { incompleteResultAlert } from '$lib/components/toast/incomplete-result-alert';
	import type { PageData } from './$types';

	export let data: PageData;

	$: incompleteResultAlert(data.invoices, data.expenses);
</script>

<div class="prose">
	<h1>Dashboard</h1>
</div>

<DashboardFilter
	properties={data.properties.results}
	units={data.units.results}
/>

<NetIncomeCard
	invoicesGrouped={data.invoicesGrouped}
	expensesGrouped={data.expensesGrouped}
/>
<RevenueCard
	invoices={data.invoices}
	invoicesGroupedPaid={data.invoicesGroupedPaid}
	invoicesGroupedUnpaid={data.invoicesGroupedUnpaid}
/>
<ExpensesCard expenses={data.expenses} categories={data.categories} />

<OccupancyCard
	occupancy={data.occupancy}
	futureOccupancy={data.futureOccupancy}
/>
