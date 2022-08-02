<script>
	import Treemap from '$lib/components/charts/treemap/Treemap.svelte';
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
				<div
					in:fade={{ duration: 400 }}
					class="node"
					class:leaf={!node.children}
					on:click={() => select(node)}
				>
					<div class="node-contents">
						{#if getLink}
							<a
								class="inline-block align-middle text-indigo-600"
								class:hidden={node.children}
								href={getLink(node)}
								target="_blank"
							>
								&#8599;
							</a>
						{/if}
						<strong>{getLabel(node) ?? ''}</strong>
						<span>{kwdFormat(node.value)}</span>
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

	strong,
	span {
		display: block;
		font-size: 12px;
		/* white-space: nowrap; */
		line-height: 1;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
