<script lang="ts">
	import { stratify } from 'd3';

	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import { ROOT_NODE } from '$lib/utils/expense-type-options';

	import type { ExpenseCategoryDto, GroupByCategoryDto } from '$api/openapi';
	import type { HierarchyNode } from 'd3';

	export let expenses: GroupByCategoryDto[];
	export let categories: ExpenseCategoryDto[];

	$: root = stratify<ExpenseCategoryDto>()
		.id((d) => d.id.toString())
		.parentId((d) => {
			if (d.id === ROOT_NODE.id) return null;
			if (!d.parentId) return ROOT_NODE.id;
			return categories.find((c) => c.id === d.parentId)?.id.toString();
		})([ROOT_NODE, ...categories]);

	$: root.sum((d) => {
		// get sum of all expenses for this category
		const categorySummary = expenses.find((e) => e.categoryId === d.id);

		if (!categorySummary) {
			return 0;
		} else {
			return categorySummary.amount;
		}
	});

	$: root.sort((a, b) => {
		return (b.value || 0) - (a.value || 0);
	});

	const getLabel = (node: HierarchyNode<ExpenseCategoryDto>) =>
		node.data.labelEn;
</script>

<!-- TODO prevent entering expenses in non-root nodes. Use a `General Opex` or `Other Opex` category instead -->
{#key expenses}
	<TreemapChart hierarchy={root} {getLabel} />
{/key}
