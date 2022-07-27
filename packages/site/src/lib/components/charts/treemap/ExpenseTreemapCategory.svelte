<script lang="ts">
	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import type { ExpenseCategoryDto, PaginatedExpenseDto } from '@self/sdk';
	import * as d3 from 'd3';

	export let expenses: PaginatedExpenseDto;
	export let categories: ExpenseCategoryDto[];

	const root = d3
		.stratify<ExpenseCategoryDto>()
		.id((d) => d.id.toString())
		.parentId((d) => {
			if (d.id === 'root') return null;
			if (!d.parentId) return 'root';
			return categories.find((c) => c.id === d.parentId)?.id.toString();
		})([{ id: 'root', parentId: null, labelEn: '' }, ...categories]);

	root.sum((d) => {
		// get sum of all expenses for this category
		const sum = expenses.results.reduce((acc, cur) => {
			if (cur.expenseType?.id === d.id) {
				return acc + cur.amount;
			}
			return acc;
		}, 0);
		return sum;
	});

	root.sort((a, b) => {
		return b.value - a.value;
	});
</script>

<!-- TODO prevent entering expenses in non-root nodes. Use a `General Opex` or `Other Opex` category instead -->
<TreemapChart hierarchy={root} getLabel={(node) => node.data.labelEn} />
