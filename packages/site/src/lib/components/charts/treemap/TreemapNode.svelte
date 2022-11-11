<script>
	// @ts-nocheck
	import * as Pancake from '@sveltejs/pancake';

	export let node;
</script>

<Pancake.Box x1={node.x0} x2={node.x1} y1={node.y1} y2={node.y0}>
	<slot {node} />
</Pancake.Box>

{#each node.children || [] as child}
	<svelte:self node={child} let:node>
		<slot {node} />
	</svelte:self>
{/each}
