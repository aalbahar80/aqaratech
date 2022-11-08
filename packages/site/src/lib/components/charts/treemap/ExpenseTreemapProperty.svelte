<script lang="ts">
	import type { GroupByLocationDto } from '$api/openapi';
	import { page } from '$app/stores';
	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import { getRoute, PageType } from '@self/utils';
	import * as d3 from 'd3';

	export let expenses: GroupByLocationDto[];

	$: rollupData = d3.rollup(
		expenses,
		// reduceFn,
		(d) => d3.sum(d, (e) => e.amount),
		// groupingFns,
		(d) => d.propertyId ?? 'Unspecified Property',
		(d) => d.unitId ?? 'Unspecified Unit',
	);

	// Type of each node is either null OR a nested maps up to 3 levels deep.
	// The three levels come from the rollup function.
	$: hierarchyData = d3
		.hierarchy(
			[null, rollupData],
			// childrenAccessorFn,
			//@ts-ignore
			([_key, value]) => {
				// value.size checks if value is a Map, which is false for `non-leaf` rolledUp nodes.
				const result = value?.size && Array.from(value);
				return result;
			},
		)
		//@ts-ignore
		.sum(([_key, value]) => value)
		.sort((a, b) => (b.value || 0) - (a.value || 0));

	const getLabel = (node: typeof hierarchyData) => {
		// 1. leaf nodes have data[0] as the last function in rollupData
		// 1. leaf nodes have data[1] as a number from rollupData
		// 2. non-leaf nodes have data[0] as null
		// 2. non-leaf nodes have data[1] as a Map (of children) from rollupData
		// 3. root node has data[0] as null
		// 3. root node has data[1] as a Map (of children) from rollupData

		const nonLeafLabel = node.data[0];
		if (typeof nonLeafLabel === 'string') {
			const propertyTitle = expenses.find(
				(e) => e.propertyId === nonLeafLabel,
			)?.propertyTitle;

			const unitTitle = expenses.find(
				(e) => e.unitId === nonLeafLabel,
			)?.unitTitle;

			return unitTitle ?? propertyTitle ?? nonLeafLabel;
		} else {
			// This handles the root node where data[0] is null and data[1] is a Map
			return '';
		}
	};

	const getLink = (node: any) => {
		console.log({ node }, 'ExpenseTreemapProperty.svelte ~ 60');
		const id = node.data[0];
		console.log(node.height, 'ExpenseTreemapProperty.svelte ~ 62');
		if (node.height === 0 && id.length === 36) {
			return getRoute({
				id,
				pageType: PageType.Id,
				entity: 'unit',
				params: $page.params,
			});
		} else {
			return null;
		}
	};
</script>

{#key expenses}
	<TreemapChart hierarchy={hierarchyData} {getLabel} {getLink} />
{/key}
