<script lang="ts">
	import HeroiconsChartPie from '~icons/heroicons/chart-pie';

	export let empty: boolean;

	const height = 600; // TODO: make this dynamic
</script>

{#if empty}
	<div
		class="w-full overflow-hidden rounded-lg bg-white p-8 shadow"
		style="height: {height}px;"
	>
		<div
			class="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 text-center"
		>
			<HeroiconsChartPie class="mx-auto h-20 w-20  text-gray-300" />
			<span class="block pt-8 text-xl font-light text-gray-900">No data</span>
		</div>
	</div>
{:else}
	<slot />
{/if}
