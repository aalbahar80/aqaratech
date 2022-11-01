<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import { kwdFormat, monthFromShort } from '$lib/utils/common';
	import TotalPaneItem from './TotalPaneItem.svelte';

	interface Datapoint extends GroupByMonthDto {
		change?: number;
	}

	export let title: string;
	export let data: Datapoint[];
</script>

<div>
	<h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
	<dl
		class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x"
	>
		<TotalPaneItem
			primaryText="This month"
			secondaryText={monthFromShort(data[2].date)}
			primaryValue={kwdFormat(data[2].amount)}
			chipText={data[2].change?.toFixed(2)}
			color={data[2].change > 0 ? 'green' : 'red'}
		/>

		<TotalPaneItem
			primaryText="Last month"
			secondaryText={monthFromShort(data[1].date)}
			primaryValue={kwdFormat(data[1].amount)}
			chipText={data[1].change?.toFixed(2)}
			color={data[1].change > 0 ? 'green' : 'red'}
		/>

		<TotalPaneItem
			primaryText={monthFromShort(data[0].date)}
			primaryValue={kwdFormat(data[0].amount)}
			chipText={data[0].change?.toFixed(2)}
			color={data[0].change > 0 ? 'green' : 'red'}
		/>
	</dl>
</div>
