<script lang="ts">
	import TreemapNode from './TreemapNode.svelte';

	import type { HierarchyRectangularNode } from 'd3';

	type T = $$Generic;

	export let root: HierarchyRectangularNode<T>;
</script>

<pancake-treemap>
	<TreemapNode
		node={root}
		let:node
	>
		<slot {node} />
	</TreemapNode>
</pancake-treemap>

<style>
	pancake-treemap {
		position: absolute;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
