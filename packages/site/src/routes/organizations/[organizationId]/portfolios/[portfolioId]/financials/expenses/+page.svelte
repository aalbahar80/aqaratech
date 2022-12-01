<script lang="ts">
	import ExpenseTreemapCategory from '$lib/components/charts/treemap/ExpenseTreemapCategory.svelte';
	import ExpenseTreemapProperty from '$lib/components/charts/treemap/ExpenseTreemapProperty.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';

	export let data: PageData;
</script>

<BarChart expenses={data.expensesByMonth} />

<ChartWrapper empty={data.expensesByLocation.length < 1}>
	<ExpenseTreemapProperty expenses={data.expensesByLocation} />
</ChartWrapper>

<ChartWrapper empty={data.expensesByCategory.length < 1}>
	<ExpenseTreemapCategory
		expenses={data.expensesByCategory}
		categories={data.categories}
	/>
</ChartWrapper>
