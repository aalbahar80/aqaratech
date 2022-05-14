<script lang="ts">
	import Tabs from '$lib/components/Tabs.svelte';
	import { ChartBar, Database } from '@steeze-ui/heroicons';

	export let title: string;
	export let subtitle = '';
	export let empty = false;

	const tabs = [
		{ name: 'Chart', icon: ChartBar },
		{ name: 'Data', icon: Database },
	];
	let tab = 'Chart';
</script>

<div class="flex flex-col gap-y-4 rounded-lg bg-white p-6 shadow-xl">
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
		<!-- <div class="sm:block" aria-hidden="true">
			<div class="py-1">
				<div class="border-t border-gray-200" />
			</div>
		</div> -->
		{#if tab === 'Chart'}
			<div class="pt-4">
				<slot name="groupBy" />
			</div>
			<slot name="chart" />
		{:else}
			<slot name="data" />
		{/if}
	{/if}
</div>
