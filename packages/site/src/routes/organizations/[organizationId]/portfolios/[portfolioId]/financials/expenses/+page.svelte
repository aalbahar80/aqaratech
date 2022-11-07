<script lang="ts">
	import ExpenseTreemapCategory from '$lib/components/charts/treemap/ExpenseTreemapCategory.svelte';
	import ExpenseTreemapProperty from '$lib/components/charts/treemap/ExpenseTreemapProperty.svelte';
	import RangeSelect from '$lib/components/dashboard/RangeSelect.svelte';
	import type { PageData } from './$types';
	import BarChart from './BarChart.svelte';

	export let data: PageData;
</script>

<RangeSelect />

<BarChart expenses={data.expensesByMonth} />

<!-- <ExpenseTreemapLocation expenses={data.expensesByLocation} /> -->

<ExpenseTreemapProperty expenses={data.expensesByLocation} />

<ExpenseTreemapCategory
	expenses={data.expensesByCategory}
	categories={data.categories}
/>
