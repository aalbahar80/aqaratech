<script lang="ts">
	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import { ROOT_NODE } from '$lib/utils/expense-type-options';
	import type { ExpenseCategoryDto, PaginatedExpenseDto } from '$api/openapi';
	import * as d3 from 'd3';

	export let expenses: PaginatedExpenseDto;
	export let categories: ExpenseCategoryDto[];

	$: root = d3
		.stratify<ExpenseCategoryDto>()
		.id((d) => d.id.toString())
		.parentId((d) => {
			if (d.id === ROOT_NODE.id) return null;
			if (!d.parentId) return ROOT_NODE.id;
			return categories.find((c) => c.id === d.parentId)?.id.toString();
		})([ROOT_NODE, ...categories]);

	$: root.sum((d) => {
		// get sum of all expenses for this category
		const sum = expenses.results.reduce((acc, cur) => {
			if (cur.expenseType?.id === d.id) {
				return acc + cur.amount;
			}
			return acc;
		}, 0);
		return sum;
	});

	$: root.sort((a, b) => {
		return (b.value || 0) - (a.value || 0);
	});

	const getLabel = (node: d3.HierarchyNode<ExpenseCategoryDto>) =>
		node.data.labelEn;
</script>

<!-- TODO prevent entering expenses in non-root nodes. Use a `General Opex` or `Other Opex` category instead -->
{#key expenses}
	<TreemapChart hierarchy={root} {getLabel} />
{/key}
