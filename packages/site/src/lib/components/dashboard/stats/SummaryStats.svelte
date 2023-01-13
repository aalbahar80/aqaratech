<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageTypePortfolio } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import StatisticsPane from '$lib/components/dashboard/stats/StatisticsPane.svelte';
	import Stats from '$lib/components/dashboard/stats/Stats.svelte';
	import { kwdFormat, monthFromShort } from '$lib/utils/common';

	import type { GroupByMonthDto } from '$api/openapi';

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
	};

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
		{#if links[title]}
			<a href={links[title]}>
				<div class="sr-only">
					{title}
				</div>
				<TextButton
					>{$L.general.details()}
					<!-- arrow-right  -->
					<span aria-hidden="true" class="rtl:rotate-180"> &nbsp;&rarr; </span>
				</TextButton>
			</a>
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
