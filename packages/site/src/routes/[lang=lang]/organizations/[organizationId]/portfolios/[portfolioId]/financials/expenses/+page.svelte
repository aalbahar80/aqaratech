<script lang="ts">
	import type { PageData } from './$types';

	import BarChart from './BarChart.svelte';

	import L from '$i18n/i18n-svelte';
	import ExpenseTreemapCategory from '$lib/components/charts/treemap/ExpenseTreemapCategory.svelte';
	import ExpenseTreemapProperty from '$lib/components/charts/treemap/ExpenseTreemapProperty.svelte';
	import ChartWrapper from '$lib/components/dashboard/cards/ChartWrapper.svelte';

	export let data: PageData;

	const maxHeight = 872;
</script>

<BarChart expenses={data.expensesByMonth} />

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
	<ExpenseTreemapCategory
		expenses={data.expensesByCategory}
		categories={[
			...data.categories,
			{
				id: 'Uncategorized',
				labelEn: 'Uncategorized',
				labelAr: 'غير مصنف',
				parentId: null,
				isGroup: false,
			},
		]}
	/>
</ChartWrapper>
