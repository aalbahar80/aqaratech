<script lang="ts">
	import type { GroupByLocationDto } from '$api/openapi';
	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';
	import * as d3 from 'd3';

	export let expenses: GroupByLocationDto[];

	$: rollupData = d3.rollup(
		expenses,
		// reduceFn,
		(d) => d3.sum(d, (e) => e.amount),
		// groupingFns,
		(d) => d.propertyTitle ?? 'Unspecified Property',
		(d) => d.unitTitle ?? 'Unspecified Unit',
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
		//@ts-ignore
		const leafLabel = node.data[0]?.labelEn;
		if (typeof nonLeafLabel === 'string') {
			return nonLeafLabel;
		} else if (typeof leafLabel === 'string') {
			return leafLabel;
		} else {
			// This handles the root node where data[0] is null and data[1] is a Map
			return '';
		}
	};

	const getLink = (node: any) => {
		const data = node.data[0];
		return `/expenses/${data.id}`;
	};
</script>

{#key expenses}
	<TreemapChart hierarchy={hierarchyData} {getLabel} {getLink} />
{/key}
