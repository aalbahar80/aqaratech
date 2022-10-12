<script lang="ts">
	import type { ByMonthDto } from '$api/openapi';
	import NetIncomeLineChart from '$lib/components/dashboard/cards/NetIncomeLineChart.svelte';
	import NetIncomeTable from '$lib/components/dashboard/cards/NetIncomeTable.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';

	export let invoicesGrouped: ByMonthDto[];
	export let invoicesGroupedPaid: ByMonthDto[];
	export let invoicesGroupedUnpaid: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];
</script>

<DashCard
	title="Net"
	subtitle="Collected Rent Income vs Total Expenses"
	empty={expensesGrouped.length < 1 && invoicesGroupedPaid.length < 1}
>
	<div slot="chart">
		<NetIncomeLineChart {invoicesGroupedPaid} {expensesGrouped} />
	</div>
	<div slot="data">
		{#key [...expensesGrouped, ...invoicesGrouped]}
			<NetIncomeTable
				{invoicesGrouped}
				{invoicesGroupedPaid}
				{invoicesGroupedUnpaid}
				{expensesGrouped}
			/>
		{/key}
	</div>
</DashCard>
