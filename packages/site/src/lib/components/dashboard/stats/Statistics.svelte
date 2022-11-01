<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatsticsPane.svelte';
	import { kwdFormat, monthFromShort } from '$lib/utils/common';

	interface Datapoint extends GroupByMonthDto {
		change?: number;
	}

	export let title: string;
	export let data: Datapoint[];

	const primary: Record<number, string | undefined> = {
		0: 'This month',
		1: 'Last month',
		2: undefined,
	};

	const links: Record<string, string> = {
		Income: 'income',
		Expenses: 'expenses',
	};

	const colors: Record<string, string> = {
		Net: 'text-gray-900',
		Uncollected: 'text-gray-900',
		Income: 'text-green-600',
		Collected: 'text-green-600',
		Expenses: 'text-red-600',
	};
</script>

<div>
	<div class="flex justify-between">
		<h3 class="text-2xl font-medium leading-6 text-gray-900">{title}</h3>
		{#if links[title]}
			<a href={links[title]}>
				<TextButton
					>Details
					<!-- arrow-right -->
					&nbsp;&rarr;
				</TextButton>
			</a>
		{/if}
	</div>
	<dl
		class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x"
	>
		{#each data.slice(0, 3) as { amount, date, change }, i}
			{@const primaryText = primary[i] ?? monthFromShort(date)}
			<StatisticsPane
				{primaryText}
				secondaryText={primary[i] ? monthFromShort(date) : ''}
				primaryValue={kwdFormat(amount)}
				textColor={colors[title]}
				chipText={change ? change.toFixed(2) : ''}
				color={change && change > 0 ? 'green' : 'red'}
			/>
		{/each}
	</dl>
</div>
