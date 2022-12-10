<script lang="ts">
	import { fade } from 'svelte/transition';

	import HeroiconsChartPie from '~icons/heroicons/chart-pie';

	export let empty: boolean;
	export let title: string;
	export let subtitle = '';
	export let subtitle2 = '';
	/**
	 * Should be the same for all charts. Except treemaps, which have a larger height.
	 * Make sure treemaps are not on the same row as other charts.
	 */
	export let maxHeight = 696;
</script>

<div
	class="w-full overflow-hidden rounded-lg bg-white p-8 shadow"
	style="height: {maxHeight}px"
>
	{#if empty}
		<div
			class="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center"
			in:fade
		>
			<HeroiconsChartPie class="mx-auto h-20 w-20  text-gray-300" />
			<span class="block pt-8 text-xl font-light text-gray-900">No data</span>
		</div>
	{:else}
		<div class="prose prose-base lg:pb-10" in:fade>
			<h3>{title}</h3>
			<p>{subtitle}</p>
			<span class="italic text-gray-500">{subtitle2}</span>
		</div>
		<slot />
	{/if}
</div>
