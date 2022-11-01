<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import { monthFromShort } from '$lib/utils/common';
	import TotalPaneItem from './TotalPaneItem.svelte';

	export let title: string;
	export let data: GroupByMonthDto[];
</script>

<div>
	<h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
	<dl
		class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x"
	>
		<TotalPaneItem
			primaryText="This month"
			secondaryText={monthFromShort(data[0].date)}
			valueText="from 56.14%"
			primaryValue="56.14%"
			color="green"
			chipText="2.02%"
		/>

		<TotalPaneItem
			primaryText="Last month"
			secondaryText={monthFromShort(data[1].date)}
			valueText="from 56.14%"
			primaryValue="24.57%"
			color="green"
			chipText="4.31%"
		/>

		<TotalPaneItem
			primaryText={monthFromShort(data[2].date)}
			valueText="from 56.14%"
			primaryValue="24.57%"
			color="red"
			chipText="4.31%"
		/>
	</dl>
</div>
