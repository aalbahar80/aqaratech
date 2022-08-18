<script context="module" lang="ts">
	import {
		defaultRange,
		defaultRangeEnd,
		rangeStart,
	} from '$lib/components/charts/utils/date-range';
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

		if (!filter.start && !filter.end) {
			filter.start = rangeStart(defaultRange);
			filter.end = defaultRangeEnd();
		}

		const [
			properties,
			units,
			invoicesGrouped,
			expensesGrouped,
			invoices,
			expenses,
			invoicesGroupedPaid,
			invoicesGroupedUnpaid,
			categories,
		] = await Promise.all([
			stuff.api!.portfolios.findProperties({ id: portfolioId }),
			stuff.api!.portfolios.findUnits({ id: portfolioId }),

			stuff.api!.aggregate.getIncomeByMonth(filter),
			stuff.api!.aggregate.getExpensesByMonth(filter),
			stuff.api!.leaseInvoices.findAll(filter),
			stuff.api!.expenses.findAll(filter), // TODO filter serverside

			stuff.api!.aggregate.getIncomeByMonth({ ...filter, paidStatus: 'paid' }),
			stuff.api!.aggregate.getIncomeByMonth({
				...filter,
				paidStatus: 'unpaid',
			}),
			stuff.api!.expenseCategories.findAll(),
		]);

		return {
			props: {
				properties,
				units,
				invoicesGrouped,
				expensesGrouped,
				invoices,
				expenses,
				invoicesGroupedPaid,
				invoicesGroupedUnpaid,
				categories,
			},
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let properties: Prop['properties'];
	export let units: Prop['units'];

	export let invoicesGrouped: Prop['invoicesGrouped'];
	export let expensesGrouped: Prop['expensesGrouped'];
	export let invoices: Prop['invoices'];
	export let expenses: Prop['expenses'];

	export let invoicesGroupedPaid: Prop['invoicesGroupedPaid'];
	export let invoicesGroupedUnpaid: Prop['invoicesGroupedUnpaid'];

	export let categories: Prop['categories'];
</script>

<div class="prose">
	<h1>Dashboard</h1>
</div>

<DashboardFilter properties={properties.results} units={units.results} />

<NetIncomeCard {invoicesGrouped} {expensesGrouped} />
<RevenueCard {invoices} {invoicesGroupedPaid} {invoicesGroupedUnpaid} />
<ExpensesCard {expenses} {categories} />
