<script lang="ts">
	import ExpenseTreemapCategory from '$lib/components/charts/treemap/ExpenseTreemapCategory.svelte';
	import ExpenseTreemapProperty from '$lib/components/charts/treemap/ExpenseTreemapProperty.svelte';
	import ExpensesTable from '$lib/components/dashboard/cards/ExpensesTable.svelte';
	import DashCard from '$lib/components/dashboard/DashCard.svelte';
	import IncompleteDataAlert from '$lib/components/dashboard/IncompleteDataAlert.svelte';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import type { ExpenseCategoryDto, PaginatedExpenseDto } from '$api/openapi';

	export let expenses: PaginatedExpenseDto;
	export let categories: ExpenseCategoryDto[];

	let chartType = 'categoryTreemap';
</script>

<DashCard
	title="Expenses"
	subtitle="The total amount of expenses by category & property."
	empty={expenses.results.length < 1}
>
	<div slot="alert">
		{#if expenses.pagination.hasNextPage}
			<IncompleteDataAlert
				entity="expense"
				count={expenses.pagination.pageSize}
			/>
		{/if}
	</div>
	<div slot="groupBy" class="flex h-14 pb-4 md:w-2/5">
		<span
			class="inline-flex w-full items-center break-words rounded-none rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 shadow-sm sm:text-sm"
		>
			Group By
		</span>
		<Select
			bind:current={chartType}
			class="rounded-none rounded-r-md py-0 sm:text-sm"
			options={[
				{ label: 'Category', value: 'categoryTreemap' },
				{ label: 'Property', value: 'propertyTreemap' },
			]}
		/>
	</div>
	<div slot="chart">
		{#if chartType === 'propertyTreemap'}
			<ExpenseTreemapProperty {expenses} />
		{:else}
			<ExpenseTreemapCategory {expenses} {categories} />
		{/if}
	</div>
	<div slot="data">
		<ExpensesTable {expenses} />
	</div>
</DashCard>
