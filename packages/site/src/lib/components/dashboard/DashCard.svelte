<script lang="ts">
	import Tabs from '$lib/components/Tabs.svelte';
	import { ChartBar, Database } from '@steeze-ui/heroicons';
	import { tweened } from 'svelte/motion';

	export let title: string;
	export let subtitle = '';
	export let empty = false;

	const tabs = [
		{ name: 'Chart', icon: ChartBar },
		{ name: 'Data', icon: Database },
	];
	let tab = 'Chart';
	const height = tweened(900);

	$: {
		if (tab === 'Chart') {
			$height = 900;
		} else {
			$height = 1200;
		}
	}
</script>

<div
	class="flex flex-col gap-y-4 rounded-lg bg-white p-6 shadow-xl"
	style:height={`${$height}px`}
>
	<div class="prose prose-base">
		<h3>{title}</h3>
		<p>{subtitle}</p>
	</div>
	{#if empty}
		<div
			class="inline-flex h-52 grow flex-col place-content-center rounded-md bg-gray-100 text-center"
		>
			<div class="prose prose-xl place-self-center">
				<small class="font-medium">No Data</small>
				<br />
				<small>There's no data available for your selection.</small>
			</div>
		</div>
	{:else}
		<Tabs {tabs} bind:tab />
		{#if tab === 'Chart'}
			<div class="pt-4">
				<slot name="groupBy" />
			</div>
			<slot name="chart" />
		{:else}
			<div class="overflow-auto">
				<slot name="data" />
			</div>
		{/if}
	{/if}
</div>
