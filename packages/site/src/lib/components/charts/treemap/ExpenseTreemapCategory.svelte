<script lang="ts">
	import type { HierarchyNode } from 'd3';

	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import {
		expenseTreeCat,
		type ExpenseCategoryLocalized,
	} from '$lib/stores/expense-tree-cat';

	const getLabel = (node: HierarchyNode<ExpenseCategoryLocalized>) =>
		node.data.label;
</script>

{#key $expenseTreeCat}
	<TreemapChart
		hierarchy={$expenseTreeCat}
		{getLabel}
	/>
{/key}
