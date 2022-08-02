<script>
	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import * as d3 from 'd3';

	// export let expenses: PaginatedExpenseDto;
	export let expenses;

	$: rollupData = d3.rollup(
		expenses.results,
		// reduceFn,
		(d) => d3.sum(d, (e) => e.amount),
		// groupingFns,
		(d) => d.breadcrumbs?.property?.label || 'Unspecified Property',
		(d) => d.breadcrumbs?.unit?.label || 'Unspecified Unit',
		(d) => `${d.postAt.split('T')[0]}: ${d.expenseType?.labelEn}` || '',
	);

	$: hierarchyData = d3
		.hierarchy(
			[null, rollupData],
			// childrenAccessorFn,
			([key, value]) => value.size && Array.from(value),
		)
		.sum(([key, value]) => value)
		.sort((a, b) => b.value - a.value);
</script>

{#key expenses}
	<TreemapChart hierarchy={hierarchyData} getLabel={(node) => node.data[0]} />
{/key}
