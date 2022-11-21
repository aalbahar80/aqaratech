<script lang="ts">
	import ExpenseTreemapCategory from '$lib/components/charts/treemap/ExpenseTreemapCategory.svelte';
	import ExpenseTreemapProperty from '$lib/components/charts/treemap/ExpenseTreemapProperty.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';

	export let data: PageData;
</script>

<BarChart expenses={data.expensesByMonth} />

<ExpenseTreemapProperty expenses={data.expensesByLocation} />

<ExpenseTreemapCategory
	expenses={data.expensesByCategory}
	categories={data.categories}
/>
