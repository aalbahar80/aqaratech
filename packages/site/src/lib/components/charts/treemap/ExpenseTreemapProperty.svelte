<script lang="ts">
	import { hierarchy, rollup, sum } from 'd3';

	import { page } from '$app/stores';
	import { getRoute, PageType } from '@self/utils';

	import type { GroupByLocationDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import TreemapChart from '$lib/components/charts/treemap/TreemapChart.svelte';

	export let expenses: GroupByLocationDto[];

	$: rollupData = rollup(
		expenses,
		// reduceFn,
		(d) => sum(d, (e) => e.amount),
		// groupingFns,
		(d) => d.propertyId ?? $L.other.unspecifiedProperty(),
		(d) => d.unitId ?? $L.other.unspecifiedUnit(),
	);

	// Type of each node is either null OR a nested maps up to 3 levels deep.
	// The three levels come from the rollup function.
	$: hierarchyData = hierarchy(
		[null, rollupData],
		// childrenAccessorFn,
		//@ts-expect-error - unknown type d3
		([_key, value]) => {
			// value.size checks if value is a Map, which is false for `non-leaf` rolledUp nodes.
			const result = value?.size && Array.from(value);
			return result;
		},
	)
		//@ts-expect-error - unknown type d3
		.sum(([_key, value]) => value)
		.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

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

	const getLink = (node: typeof hierarchyData) => {
		const id = node.data[0];

		//@ts-expect-error - unknown type d3
		if (node.height === 0 && typeof id === 'string' && id.length === 36) {
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
