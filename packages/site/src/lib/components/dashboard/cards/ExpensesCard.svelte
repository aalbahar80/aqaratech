<script lang="ts">
	import ExpensesTable from '$lib/components/dashboard/cards/ExpensesTable.svelte';
	import ExpenseArea from '$lib/components/charts/ExpenseArea.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import type { PaginatedExpenseDto } from '@self/sdk';

	export let expenses: PaginatedExpenseDto;

	let chartType = 'category';
</script>

<DashCard
	title="Expenses"
	subtitle="The total amount of expenses by category & property."
	empty={expenses.results.length < 1}
>
	<!-- <div slot="groupBy" class="flex w-64 pb-4">
		<span
			class="mt-1 inline-flex w-1/2 items-center break-words rounded-none rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 shadow-sm sm:text-sm"
		>
			Group By
		</span>
		<Select
			bind:current={chartType}
			class="w-1/2 rounded-none rounded-r-md py-0 sm:text-sm"
			options={[
				{ label: 'Type', value: 'category' },
				{ label: 'Property', value: 'property' },
			]}
		/>
	</div> -->
	<div slot="chart">
		<ExpenseArea {expenses} />
	</div>
	<div slot="data">
		<ExpensesTable {expenses} />
	</div>
</DashCard>
