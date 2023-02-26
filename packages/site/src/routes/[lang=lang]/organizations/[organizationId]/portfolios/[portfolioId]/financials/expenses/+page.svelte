<script lang="ts">
	import type { PageData } from './$types';

	import BarChart from './BarChart.svelte';
	import PieChart from './PieChart.svelte';

	import L from '$i18n/i18n-svelte';
	import ExpenseTreemapCategory from '$lib/components/charts/treemap/ExpenseTreemapCategory.svelte';
	import ExpenseTreemapProperty from '$lib/components/charts/treemap/ExpenseTreemapProperty.svelte';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';
	import { categoriesRaw } from '$lib/stores/expense-categories';
	import { expensesByCategory } from '$lib/stores/expense-tree-cat';

	export let data: PageData;

	const maxHeight = 872;

	$: expensesByCategory.set(data.expensesByCategory);
	$: categoriesRaw.set(data.categories); // TODO: make global
</script>

<div class="grid grid-cols-1 gap-8 xl:grid-cols-3">
	<PieChart empty={data.expensesByCategory.length < 1} />

	<div class="xl:col-span-2">
		<BarChart expenses={data.expensesByMonth} />
	</div>
</div>

<ChartWrapper
	empty={data.expensesByLocation.length < 1}
	title={$L.charts.expensesLocationTreeMap.title()}
	subtitle={$L.charts.expensesLocationTreeMap.subtitle()}
	subtitle2={$L.charts.expensesLocationTreeMap.subtitle2()}
	{maxHeight}
>
	<ExpenseTreemapProperty expenses={data.expensesByLocation} />
</ChartWrapper>

<ChartWrapper
	empty={data.expensesByCategory.length < 1}
	title={$L.charts.expensesCategoryTreeMap.title()}
	subtitle={$L.charts.expensesCategoryTreeMap.subtitle()}
	subtitle2={$L.charts.expensesCategoryTreeMap.subtitle2()}
	{maxHeight}
>
	<ExpenseTreemapCategory />
</ChartWrapper>
