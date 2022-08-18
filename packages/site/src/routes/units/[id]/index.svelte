<script lang="ts" context="module">
	import {
		defaultRange,
		defaultRangeEnd,
		rangeStart,
	} from '$lib/components/charts/utils/date-range';
	import ExpensesCard from '$lib/components/dashboard/cards/ExpensesCard.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import RevenueCard from '$lib/components/dashboard/cards/RevenueCard.svelte';
	import DashboardFilter from '$lib/components/dashboard/DashboardFilter.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { incompleteResultAlert } from '$lib/components/toast/narrow-filters-alert';
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import { parseParams } from '$lib/utils/parse-params';
	import { create } from '$lib/utils/route-helpers';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const unitId = params.id;
		const sParams = parseParams(url);
		const filter = {
			...sParams,
			unitId,
			start: url.searchParams.get('start') || undefined,
			end: url.searchParams.get('end') || undefined,
			take: 1000,
		};

		if (!filter.start && !filter.end) {
			filter.start = rangeStart(defaultRange);
			filter.end = defaultRangeEnd();
		}

		const [
			unit,
			leases,
			invoicesGrouped,
			expensesGrouped,
			invoices,
			expenses,
			invoicesGroupedPaid,
			invoicesGroupedUnpaid,
			categories,
		] = await Promise.all([
			stuff.api!.units.findOne({ id: unitId }),
			stuff.api!.units.findLeases({ id: unitId, ...sParams }),

			stuff.api!.aggregate.getIncomeByMonth(filter),
			stuff.api!.aggregate.getExpensesByMonth(filter),
			stuff.api!.leaseInvoices.findAll(filter),
			stuff.api!.expenses.findAll(filter), // TODO filter serverside

			stuff.api!.aggregate.getIncomeByMonth({
				...filter,
				paidStatus: 'paid',
			}),
			stuff.api!.aggregate.getIncomeByMonth({
				...filter,
				paidStatus: 'unpaid',
			}),
			stuff.api!.expenseCategories.findAll(),
		]);

		return {
			props: {
				unit,
				leases,
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
	export let unit: Prop['unit'];
	export let leases: Prop['leases'];

	export let invoicesGrouped: Prop['invoicesGrouped'];
	export let expensesGrouped: Prop['expensesGrouped'];
	export let invoices: Prop['invoices'];
	export let expenses: Prop['expenses'];

	export let invoicesGroupedPaid: Prop['invoicesGroupedPaid'];
	export let invoicesGroupedUnpaid: Prop['invoicesGroupedUnpaid'];

	export let categories: Prop['categories'];

	$: details = [
		...(unit.label ? [['Label', unit.label]] : []),
		['Unit Number', unit.unitNumber],
		['Type', unit.type],
		['Market Rent', kwdFormat(unit.marketRent)],
		['Usage', unit.usage],
	] as [string, string | null][];

	$: incompleteResultAlert(invoices, expenses);
</script>

<UnitPage {unit} />
<DetailsPane {details} />
<LeaseList
	{leases}
	formUrl={(function () {
		const base = create({ entity: 'lease' });
		const searchParams = new URLSearchParams({
			portfolioId: unit.breadcrumbs.portfolio.id,
			propertyId: unit.propertyId,
			unitId: unit.id,
		});
		return `${base}?${searchParams.toString()}`;
	})()}
	showIndex
/>
<DashboardFilter
	properties={[]}
	units={[unit]}
	disabledPropertySelector
	disabledUnitSelector
/>
<NetIncomeCard {invoicesGrouped} {expensesGrouped} />
<RevenueCard
	{invoices}
	{invoicesGroupedPaid}
	{invoicesGroupedUnpaid}
	disabledPropertyBreakdown
/>
<ExpensesCard {expenses} {categories} />
