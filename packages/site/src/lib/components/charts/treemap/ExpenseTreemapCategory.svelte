<script lang="ts">
	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import { rootId } from '$lib/utils/expense-type-options';
	import type { ExpenseCategoryDto, PaginatedExpenseDto } from '@self/sdk';
	import * as d3 from 'd3';

	export let expenses: PaginatedExpenseDto;
	export let categories: ExpenseCategoryDto[];

	$: root = d3
		.stratify<ExpenseCategoryDto>()
		.id((d) => d.id.toString())
		.parentId((d) => {
			// use rootId constant
			if (d.id === rootId) return null;
			if (!d.parentId) return rootId;
			return categories.find((c) => c.id === d.parentId)?.id.toString();
		})([{ id: rootId, parentId: null, labelEn: '' }, ...categories]);

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
