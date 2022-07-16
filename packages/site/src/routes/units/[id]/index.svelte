<script lang="ts" context="module">
	import NetIncomeCard from '$lib/components/dashboard/cards/NetIncomeCard.svelte';
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
		const chartFilter = { unitId: params.id };

		const [unit, leases, income, expenses] = await Promise.all([
			stuff.api!.units.findOne({ id: params.id }),
			stuff.api!.units.findLeases({ id: params.id, ...sParams }),

			stuff.api!.analytics.getIncomeByMonth(chartFilter),
			stuff.api!.analytics.getExpensesByMonth(chartFilter),
		]);

		return { props: { unit, leases, income, expenses } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let unit: Prop['unit'];
	export let leases: Prop['leases'];

	export let income: Prop['income'];
	export let expenses: Prop['expenses'];
</script>

<UnitPage {unit}>
	<LeaseList {leases} showIndex />
	<NetIncomeCard {income} {expenses} />
</UnitPage>
