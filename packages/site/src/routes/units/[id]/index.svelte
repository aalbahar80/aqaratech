<script lang="ts" context="module">
	import ExpensesCard from '$lib/components/dashboard/cards/ExpensesCard.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import RevenueCard from '$lib/components/dashboard/cards/RevenueCard.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const sParams = parseParams(url);
		const filter = { unitId: params.id };

		const [
			unit,
			leases,
			invoicesGrouped,
			expensesGrouped,
			invoices,
			expenses,
			invoicesGroupedPaid,
			invoicesGroupedUnpaid,
		] = await Promise.all([
			stuff.api!.units.findOne({ id: params.id }),
			stuff.api!.units.findLeases({ id: params.id, ...sParams }),

			stuff.api!.analytics.getIncomeByMonth(filter),
			stuff.api!.analytics.getExpensesByMonth(filter),
			stuff.api!.leaseInvoices.findAll(filter),
			stuff.api!.expenses.findAll(filter), // TODO filter serverside

			stuff.api!.analytics.getIncomeByMonth({
				...filter,
				paidStatus: 'paid',
			}),
			stuff.api!.analytics.getIncomeByMonth({
				...filter,
				paidStatus: 'unpaid',
			}),
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
</script>

<UnitPage {unit}>
	<LeaseList {leases} showIndex />
	<NetIncomeCard {invoicesGrouped} {expensesGrouped} />
	<RevenueCard {invoices} {invoicesGroupedPaid} {invoicesGroupedUnpaid} />
	<ExpensesCard {expenses} />
</UnitPage>
