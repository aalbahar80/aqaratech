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
		const chartFilter = { propertyId: params.id };

		const [property, units, income, expensesGrouped, invoices, expenses] =
			await Promise.all([
				stuff.api!.properties.findOne({ id: params.id }),
				stuff.api!.properties.findUnits({ id: params.id, ...sParams }),

				stuff.api!.analytics.getIncomeByMonth(chartFilter),
				stuff.api!.analytics.getExpensesByMonth(chartFilter),
				stuff.api!.leaseInvoices.findAll(chartFilter),
				stuff.api!.expenses.findAll(chartFilter), // TODO filter serverside
			]);

		return {
			props: { property, units, income, expensesGrouped, invoices, expenses },
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let property: Prop['property'];
	export let units: Prop['units'];

	export let income: Prop['income'];
	export let expensesGrouped: Prop['expensesGrouped'];
	export let invoices: Prop['invoices'];
	export let expenses: Prop['expenses'];
</script>

<PropertyPage {property}>
	<UnitsList {units} />
	<NetIncomeCard {income} expenses={expensesGrouped} />
	<RevenueCard {invoices} />
	<ExpensesCard {expenses} />
</PropertyPage>
