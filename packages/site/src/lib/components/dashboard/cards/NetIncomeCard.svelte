<script lang="ts">
	import NetIncomeLineChart from '$lib/components/dashboard/cards/NetIncomeLineChart.svelte';
	import NetIncomeTable from '$lib/components/dashboard/cards/NetIncomeTable.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import type { ByMonthDto } from '$api/openapi';

	export let invoicesGrouped: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];
</script>

<DashCard
	title="Net"
	subtitle="Total Rent Income vs Total Expenses"
	empty={expensesGrouped.length < 1 && invoicesGrouped.length < 1}
>
	<div slot="chart">
		<NetIncomeLineChart {invoicesGrouped} {expensesGrouped} />
	</div>
	<div slot="data">
		<NetIncomeTable {invoicesGrouped} {expensesGrouped} />
	</div>
</DashCard>
