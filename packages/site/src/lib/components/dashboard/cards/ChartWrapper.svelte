<script lang="ts">
	import { fade } from 'svelte/transition';

	import L from '$i18n/i18n-svelte';
	import HeroiconsChartPie from '~icons/heroicons/chart-pie';

	export let empty: boolean;
	export let title = '';
	export let subtitle = '';
	export let subtitle2 = '';
	/** Should be the same for all charts. Except treemaps, which have a larger height.
	 * Make sure treemaps are not on the same row as other charts. */
	export let isFixedHeight = true;
</script>

<div
	data-testid="chart-card"
	class="flex w-full flex-col justify-between overflow-hidden rounded-lg bg-white p-4 shadow"
	class:chart-fixed-height={isFixedHeight}
>
	{#if empty}
		<div
			class="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center"
			in:fade
		>
			<HeroiconsChartPie class="mx-auto h-20 w-20  text-gray-300" />
			<span class="block pt-8 text-xl font-light text-gray-900"
				>{$L.charts.empty.title()}</span
			>
		</div>
	{:else}
		{#if title}
			<div
				class="prose prose-base"
				in:fade
			>
				<h3>{title}</h3>
				<p>{subtitle}</p>
				<p class="italic text-gray-500">{subtitle2}</p>
			</div>
		{/if}
		<slot />
	{/if}
</div>

<style lang="postcss">
	.chart-fixed-height {
		height: 400px;
	}
</style>
