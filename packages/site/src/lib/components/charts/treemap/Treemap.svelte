<script lang="ts">
	import TreemapNode from './TreemapNode.svelte';

	export let root: unknown;
</script>

<pancake-treemap>
	<TreemapNode node={root} let:node>
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
