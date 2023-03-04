<script>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck
	import * as Pancake from '@sveltejs/pancake';
	import clsx from 'clsx';
	import { treemap } from 'd3';

	import * as eases from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	import Treemap from '$lib/components/charts/treemap/Treemap.svelte';
	import { fmtCurrency } from '$lib/i18n/format';

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
				{@const leaf = !node.children}

				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					in:fade={{ duration: 400 }}
					class="pointer-events-auto absolute h-full w-full overflow-hidden bg-white"
					class:cursor-pointer={!leaf}
					on:click={() => select(node)}
				>
					<!-- Tile -->
					<div
						class={clsx(
							'flex h-full w-full items-center justify-center rounded-lg border-4 border-white px-1 py-1.5 text-white',
							leaf ? 'bg-gray-400' : 'bg-gray-500',
						)}
					>
						<!-- Label -->
						<div
							class="flex flex-col flex-nowrap gap-x-2 overflow-hidden text-ellipsis"
						>
							<!-- Consider passing in link in data structure if there is a need to optimize -->
							{#if getLink?.(node)}
								<a
									class="absolute right-2 top-2 align-middle text-lg text-indigo-600"
									class:hidden={node.children}
									href={getLink(node)}
									target="_blank"
									rel="noopener noreferrer"
									data-sveltekit-reload
								>
									&#8599;
								</a>
							{/if}
							<strong>{getLabel(node) ?? ''}</strong>
							<span>{fmtCurrency(node.value)}</span>
						</div>
					</div>
				</div>
			{/if}
		</Treemap>
	</Pancake.Chart>
</div>

<style lang="postcss">
	.chart {
		width: calc(100% + 2px);
		height: 600px;
		padding: 0;
		margin: 0 -1px 36px -1px;
		overflow: hidden;
	}
</style>
