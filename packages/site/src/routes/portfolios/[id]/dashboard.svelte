<script context="module" lang="ts">
	import ExpensesCard from '$lib/components/dashboard/cards/ExpensesCard.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import RevenueCard from '$lib/components/dashboard/cards/RevenueCard.svelte';
	import DashboardFilter from '$lib/components/dashboard/DashboardFilter.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		stuff,
		params,
		url,
	}: LoadEvent<{ id: string }>) => {
		const portfolioId = params.id;
		const filter = {
			portfolioId,
			propertyId: url.searchParams.get('propertyId') || undefined,
			unitId: url.searchParams.get('unitId') || undefined,
			start: url.searchParams.get('start') || undefined,
			end: url.searchParams.get('end') || undefined,
			take: 1000,
		};

		const [
			properties,
			units,
			income,
			expensesGrouped,
			invoices,
			expenses,
			incomePaid,
			incomeUnpaid,
		] = await Promise.all([
			stuff.api!.portfolios.findProperties({ id: portfolioId }),
			stuff.api!.portfolios.findUnits({ id: portfolioId }),

			stuff.api!.analytics.getIncomeByMonth(filter),
			stuff.api!.analytics.getExpensesByMonth(filter),
			stuff.api!.leaseInvoices.findAll(filter),
			stuff.api!.expenses.findAll(filter), // TODO filter serverside

			// TODO better names
			stuff.api!.analytics.getIncomeByMonth({ ...filter, paidStatus: 'paid' }),
			stuff.api!.analytics.getIncomeByMonth({
				...filter,
				paidStatus: 'unpaid',
			}),
		]);

		return {
			props: {
				properties,
				units,
				income,
				expensesGrouped,
				invoices,
				expenses,
				incomePaid,
				incomeUnpaid,
			},
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let properties: Prop['properties'];
	export let units: Prop['units'];

	export let income: Prop['income'];
	export let expensesGrouped: Prop['expensesGrouped'];
	export let invoices: Prop['invoices'];
	export let expenses: Prop['expenses'];

	export let incomePaid: Prop['incomePaid'];
	export let incomeUnpaid: Prop['incomeUnpaid'];
</script>

<div class="prose">
	<h1>Dashboard</h1>
</div>

<DashboardFilter {properties} {units} />

<NetIncomeCard {income} expenses={expensesGrouped} />
<RevenueCard {invoices} {incomePaid} {incomeUnpaid} />
<ExpensesCard {expenses} />
