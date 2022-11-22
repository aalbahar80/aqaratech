<script lang="ts">
	import type { GroupByMonthDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { property } from '$lib/stores/filter/property';
	import { unit } from '$lib/stores/filter/unit';
	import { kwdFormat, monthFromShort } from '$lib/utils/common';
	import { getRoute, PageTypePortfolio } from '@self/utils';
	import * as R from 'remeda';

	interface Datapoint extends GroupByMonthDto {
		change?: number;
	}

	export let title: 'Net' | 'Income' | 'Expenses';
	export let data: Datapoint[];

	const primary: Record<number, string | undefined> = {
		0: 'This month',
		1: 'Last month',
		2: undefined,
	};

	const links = {
		Income: getRoute({
			entity: 'portfolio',
			id: $page.params['portfolioId']!,
			params: $page.params,
			pageType: PageTypePortfolio.Income,
		}),
		Expenses: getRoute({
			entity: 'portfolio',
			id: $page.params['portfolioId']!,
			params: $page.params,
			pageType: PageTypePortfolio.Expenses,
		}),
	} as const;

	const colors: Record<string, string> = {
		Net: 'text-gray-900',
		Uncollected: 'text-gray-900',
		Income: 'text-green-600',
		Collected: 'text-green-600',
		Expenses: 'text-red-600',
	};
</script>

<Stats {title}>
	<div slot="details">
		{#if title === 'Income' || title === 'Expenses'}
			<button
				on:click={() => {
					// Redundant if condition for svelte only
					if (title !== 'Income' && title !== 'Expenses') {
						throw new Error('Unexpected title');
					}

					// Prepare the store with the correct propertyId, then navigate
					property.set(
						$page.params['propertyId'] ??
							R.pathOr($page.data, ['unit', 'propertyId'], undefined),
					);

					unit.set($page.params['unitId']);

					void goto(links[title]);
				}}
			>
				<TextButton
					>Details
					<!-- arrow-right  -->
					&nbsp;&rarr;
				</TextButton>
			</button>
		{/if}
	</div>

	<svelte:fragment slot="panes">
		{#each data.slice(0, 3) as { amount, date, change }, i}
			{@const primaryText = primary[i] ?? monthFromShort(date)}
			<StatisticsPane
				{primaryText}
				secondaryText={primary[i] ? monthFromShort(date) : ''}
				primaryValue={kwdFormat(amount)}
				textColor={colors[title] ?? ''}
				chipText={change ? change.toFixed(2) : ''}
				color={change && change > 0 ? 'green' : 'red'}
			/>
		{/each}
	</svelte:fragment>
</Stats>
