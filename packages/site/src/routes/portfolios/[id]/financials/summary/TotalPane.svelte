<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import { kwdFormat, monthFromShort } from '$lib/utils/common';
	import TotalPaneItem from './TotalPaneItem.svelte';

	interface Datapoint extends GroupByMonthDto {
		chipText: string;
		color: 'green' | 'red';
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
			color={data[2].color}
		/>

		<TotalPaneItem
			primaryText="Last month"
			secondaryText={monthFromShort(data[1].date)}
			primaryValue={kwdFormat(data[1].amount)}
			chipText={data[1].chipText}
			color={data[1].color}
		/>

		<TotalPaneItem
			primaryText={monthFromShort(data[0].date)}
			primaryValue={kwdFormat(data[0].amount)}
			chipText={data[0].chipText}
			color={data[0].color}
		/>
	</dl>
</div>
