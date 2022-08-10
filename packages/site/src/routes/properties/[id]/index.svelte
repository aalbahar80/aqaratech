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
		const propertyId = params.id;
		const sParams = parseParams(url);
		const filter = {
			...sParams,
			propertyId,
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
			property,
			files,
			units,
			invoicesGrouped,
			expensesGrouped,
			invoices,
			expenses,
			invoicesGroupedPaid,
			invoicesGroupedUnpaid,
			categories,
		] = await Promise.all([
			stuff.api!.properties.findOne({ id: propertyId }),
			stuff.api!.files.findAll({
				relationKey: 'properties',
				relationValue: propertyId,
			}),
			stuff.api!.properties.findUnits({ id: propertyId, ...sParams }),

			stuff.api!.aggregate.getIncomeByMonth(filter),
			stuff.api!.aggregate.getExpensesByMonth(filter),
			stuff.api!.leaseInvoices.findAll(filter),
			stuff.api!.expenses.findAll(filter), // TODO filter serverside

			stuff.api!.aggregate.getIncomeByMonth({ ...filter, paidStatus: 'paid' }),
			stuff.api!.aggregate.getIncomeByMonth({
				...filter,
				paidStatus: 'unpaid',
			}),
			stuff.api!.meta.findExpenseTypes({ propertyId }),
		]);

		return {
			props: {
				property,
				files,
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
	export let property: Prop['property'];
	export let files: Prop['files'];
	export let units: Prop['units'];

	export let invoicesGrouped: Prop['invoicesGrouped'];
	export let expensesGrouped: Prop['expensesGrouped'];
	export let invoices: Prop['invoices'];
	export let expenses: Prop['expenses'];

	export let invoicesGroupedPaid: Prop['invoicesGroupedPaid'];
	export let invoicesGroupedUnpaid: Prop['invoicesGroupedUnpaid'];

	export let categories: Prop['categories'];

	$: details = [
		...(property.label ? [['Label', property.label]] : []),
		['Address', property.breadcrumbs.property.label],
		['Area', property.area],
		['Block', property.block],
		['Avenue', property.avenue],
		['Street', property.street],
		['Number', property.number],
		['Parcel', property.parcel],
		['Paci', property.paci],
	] as [string, string | null][];
</script>

<PropertyPage {property} />
<DetailsPane {details} {files} />
<UnitsList {units} />
<DashboardFilter
	properties={[property]}
	units={units.results}
	disabledPropertySelector
/>
<NetIncomeCard {invoicesGrouped} {expensesGrouped} />
<RevenueCard
	{invoices}
	{invoicesGroupedPaid}
	{invoicesGroupedUnpaid}
	disabledPropertyBreakdown
/>
<ExpensesCard {expenses} {categories} />
