<script lang="ts">
	import ExpenseTreemapCategory from '$lib/components/charts/treemap/ExpenseTreemapCategory.svelte';
	import ExpenseTreemapProperty from '$lib/components/charts/treemap/ExpenseTreemapProperty.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';

	export let data: PageData;

	const maxHeight = 872;
</script>

<BarChart expenses={data.expensesByMonth} />

<ChartWrapper
	empty={data.expensesByLocation.length < 1}
	title="Expenses: by Location"
	subtitle="Total expenses by location for the selected period."
	subtitle2="Click on a tile to zoom in. Tile size is proportional."
	{maxHeight}
>
	<ExpenseTreemapProperty expenses={data.expensesByLocation} />
</ChartWrapper>

<ChartWrapper
	empty={data.expensesByCategory.length < 1}
	title="Expenses: by Category"
	subtitle="Total expenses by category for the selected period."
	subtitle2="Click on a tile to zoom in. Tile size is proportional."
>
	<ExpenseTreemapCategory
		expenses={data.expensesByCategory}
		categories={data.categories}
		{maxHeight}
	/>
</ChartWrapper>
