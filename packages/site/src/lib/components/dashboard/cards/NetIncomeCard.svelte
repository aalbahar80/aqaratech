<script lang="ts">
	import type { ByMonthDto } from '$api/openapi';
	import NetIncomeLineChart from '$lib/components/dashboard/cards/NetIncomeLineChart.svelte';
	import NetIncomeTable from '$lib/components/dashboard/cards/NetIncomeTable.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';

	export let invoicesGroupedPaid: ByMonthDto[];
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
		{#key [...expensesGrouped, ...invoicesGroupedPaid]}
			<NetIncomeTable {invoicesGroupedPaid} {expensesGrouped} />
		{/key}
	</div>
</DashCard>
