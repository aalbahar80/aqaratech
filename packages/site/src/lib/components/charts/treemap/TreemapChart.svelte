<script>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck
	import * as Pancake from '@sveltejs/pancake';
	import { treemap } from 'd3';

	import * as eases from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	import Treemap from '$lib/components/charts/treemap/Treemap.svelte';
	import TreemapTile from '$lib/components/charts/treemap/TreemapTile.svelte';

	// export let hierarchy: HierarchyNode<any>;
	// export let getLabel: (node: HierarchyNode<any>) => string;
	export let hierarchy;
	export let getLabel;
	export let getLink = undefined;

	const root = treemap()(hierarchy);

	let selected = root;

	const select = (node) => {
		while (node.parent && node.parent !== selected) {
			node = node.parent;
		}

		if (node?.children) selected = node;
	};

	const breadcrumbs = (node) => {
		const crumbs = [];
		while (node) {
			crumbs.unshift(getLabel(node) ?? '');
			node = node.parent;
		}

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return crumbs;
	};

	const extents = tweened(undefined, {
		easing: eases.cubicOut,
		duration: 600,
	});

	const is_visible = (a, b) => {
		while (b) {
			if (a.parent === b) return true;
			b = b.parent;
		}

		return false;
	};

	$: $extents = {
		x1: selected.x0,
		x2: selected.x1,
		y1: selected.y1,
		y2: selected.y0,
	};
</script>

<!--
@component
Create a treemap from a d3-hierarchy.
-->
<button
	class="mb-4 mt-8 flex h-4 items-center"
	disabled={!selected.parent}
	on:click={() => (selected = selected.parent)}
>
	{#each breadcrumbs(selected) as crumb, idx}
		{#if idx !== 0}
			<svg
				class="h-5 w-5 flex-shrink-0 text-gray-300"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 20 20"
				aria-hidden="true"
			>
				<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
			</svg>
		{/if}
		<span
			class="font-medium text-gray-500 last:font-semibold last:text-indigo-600 hover:text-gray-700 last:hover:text-indigo-900"
		>
			{crumb}
		</span>
	{/each}
</button>

<div
	class="relative -mx-[1px] mb-9 h-[400px] overflow-hidden md:h-[600px]"
	style:width="calc(100% + 2px)"
>
	<Pancake.Chart
		x1={$extents.x1}
		x2={$extents.x2}
		y1={$extents.y1}
		y2={$extents.y2}
	>
		<Treemap
			{root}
			let:node
		>
			{#if is_visible(node, selected)}
				{@const leaf = !node.children}

				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="pointer-events-auto absolute h-full w-full overflow-hidden bg-white"
					class:cursor-pointer={!leaf}
					on:click={() => select(node)}
					in:fade={{ duration: 400 }}
				>
					<TreemapTile
						{node}
						{leaf}
						{getLabel}
						{getLink}
					/>
				</div>
			{/if}
		</Treemap>
	</Pancake.Chart>
</div>
