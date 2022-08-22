<script lang="ts">
	import IncompleteDataAlert from '$lib/components/dashboard/IncompleteDataAlert.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import { ChartBar, Database } from '@steeze-ui/heroicons';
	import { tweened } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	export let title: string;
	export let subtitle = '';
	export let empty = false;
	export let tabbed = true;
	export let chartHeight = 1000;
	export let showAlert = false;

	const tabs = [
		{ name: 'Chart', icon: ChartBar },
		{ name: 'Data', icon: Database },
	] as const;

	type TabName = typeof tabs[number]['name'];
	let tab: TabName = 'Chart';
	const height = tweened(900);
	let heightTable: number | undefined;

	const recalcHeight = (tab: 'Chart' | 'Data', h: typeof heightTable) => {
		if (tab === 'Chart') {
			$height = chartHeight;
		} else {
			const newHeight = h ?? 0;
			$height = 200 + newHeight;
		}
	};

	$: recalcHeight(tab, heightTable);
</script>

<div
	class="flex flex-col gap-y-4 rounded-lg bg-white p-6 shadow-xl"
	style:height={`${$height}px`}
	data-test-id="dashcard"
>
	<div class="prose prose-base">
		<h3>{title}</h3>
		<p>{subtitle}</p>
		{#if showAlert}
			<IncompleteDataAlert />
		{/if}
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
		{#if tabbed}
			<Tabs {tabs} bind:tab />
		{/if}
		{#if tab === 'Chart'}
			<div class="pt-4">
				<slot name="groupBy" />
			</div>
			<slot name="chart" />
		{:else}
			<div bind:offsetHeight={heightTable}>
				<div in:fade class="overflow-x-auto overflow-y-hidden">
					<slot name="data" />
				</div>
			</div>
		{/if}
	{/if}
</div>
