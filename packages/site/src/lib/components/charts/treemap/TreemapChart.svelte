<script>
	import Treemap from '$lib/components/charts/treemap/Treemap.svelte';
	import { classes } from '$lib/utils/classes';
	import { kwdFormat } from '$lib/utils/common';
	import * as Pancake from '@sveltejs/pancake';
	import * as d3 from 'd3';
	import * as eases from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	// export let hierarchy: d3.HierarchyNode<any>;
	// export let getLabel: (node: d3.HierarchyNode<any>) => string;
	export let hierarchy;
	export let getLabel;
	export let getLink = undefined;

	const treemap = d3.treemap();

	const root = treemap(hierarchy);

	let selected = root;

	const select = (node) => {
		while (node.parent && node.parent !== selected) {
			node = node.parent;
		}

		if (node && node.children) selected = node;
	};

	const breadcrumbs = (node) => {
		const crumbs = [];
		while (node) {
			crumbs.unshift(getLabel(node) ?? '');
			node = node.parent;
		}

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
	class="flex items-center p-1.5"
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

<div class="chart">
	<Pancake.Chart
		x1={$extents.x1}
		x2={$extents.x2}
		y1={$extents.y1}
		y2={$extents.y2}
	>
		<Treemap {root} let:node>
			{#if is_visible(node, selected)}
				<!-- only display label if square is big enough -->
				{@const width = (node.x1 - node.x0) / ($extents.x2 - $extents.x1)}
				{@const height = (node.y1 - node.y0) / ($extents.y1 - $extents.y2)}
				{@const area = width * height}

				<div
					in:fade={{ duration: 400 }}
					class="node"
					class:leaf={!node.children}
					on:click={() => select(node)}
				>
					<div class="node-contents">
						<div
							class={classes(
								height > width ? 'flex-col' : 'flex-row',
								'flex flex-nowrap gap-x-2 overflow-hidden text-ellipsis',
							)}
							class:text-xs={area < 0.03}
							class:text-md={area > 0.03 && area < 0.07}
							class:text-xl={area > 0.07}
						>
							<!-- Consider passing in link in data structure if there is a need to optimize -->
							{#if getLink && getLink(node)}
								<a
									class="align-middle text-lg text-indigo-600"
									class:hidden={node.children}
									href={getLink(node)}
									target="_blank"
									rel="noreferrer"
									data-sveltekit-reload
								>
									&#8599;
								</a>
							{/if}
							{#if area > 0.012}
								<strong>{getLabel(node) ?? ''}</strong>
								<span>{kwdFormat(node.value)}</span>
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</Treemap>
	</Pancake.Chart>
</div>

<style>
	.chart {
		width: calc(100% + 2px);
		height: 600px;
		padding: 0;
		margin: 0 -1px 36px -1px;
		overflow: hidden;
	}

	.node {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: white;
		overflow: hidden;
		pointer-events: all;
	}

	.node:not(.leaf) {
		cursor: pointer;
	}

	.node-contents {
		width: 100%;
		height: 100%;
		padding: 0.3rem 0.4rem;
		border: 1px solid white;
		background-color: hsl(240, 8%, 70%);
		color: white;
		border-radius: 4px;
		box-sizing: border-box;
	}

	.node:not(.leaf) .node-contents {
		background-color: hsl(240, 8%, 44%);
	}
</style>
