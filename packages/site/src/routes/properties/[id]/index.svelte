<script lang="ts" context="module">
	import ExpensesCard from '$lib/components/dashboard/cards/ExpensesCard.svelte';
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
	import RevenueCard from '$lib/components/dashboard/cards/RevenueCard.svelte';
	import PropertyPage from '$lib/components/property/PropertyPage.svelte';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const sParams = parseParams(url);
		const filter = { propertyId: params.id };

		const [
			property,
			units,
			invoicesGrouped,
			expensesGrouped,
			invoices,
			expenses,
			invoicesGroupedPaid,
			invoicesGroupedUnpaid,
		] = await Promise.all([
			stuff.api!.properties.findOne({ id: params.id }),
			stuff.api!.properties.findUnits({ id: params.id, ...sParams }),

			stuff.api!.analytics.getIncomeByMonth(filter),
			stuff.api!.analytics.getExpensesByMonth(filter),
			stuff.api!.leaseInvoices.findAll(filter),
			stuff.api!.expenses.findAll(filter), // TODO filter serverside

			stuff.api!.analytics.getIncomeByMonth({ ...filter, paidStatus: 'paid' }),
			stuff.api!.analytics.getIncomeByMonth({
				...filter,
				paidStatus: 'unpaid',
			}),
		]);

		return {
			props: {
				property,
				units,
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
	export let property: Prop['property'];
	export let units: Prop['units'];

	export let invoicesGrouped: Prop['invoicesGrouped'];
	export let expensesGrouped: Prop['expensesGrouped'];
	export let invoices: Prop['invoices'];
	export let expenses: Prop['expenses'];

	export let invoicesGroupedPaid: Prop['invoicesGroupedPaid'];
	export let invoicesGroupedUnpaid: Prop['invoicesGroupedUnpaid'];
</script>

<PropertyPage {property}>
	<UnitsList {units} />
	<NetIncomeCard {invoicesGrouped} {expensesGrouped} />
	<RevenueCard {invoices} {invoicesGroupedPaid} {invoicesGroupedUnpaid} />
	<ExpensesCard {expenses} />
</PropertyPage>
