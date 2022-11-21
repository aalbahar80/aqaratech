<script lang="ts">
	import type { BalanceDto } from '$api/openapi';
	import { page } from '$app/stores';
	import BalanceLineItem from '$lib/components/balance/BalanceLineItem.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import { getRoute, PageTypePortfolio } from '@self/utils';

	export let balance: BalanceDto;

	$: baseRoute = {
		entity: 'portfolio',
		id: $page.params['portfolioId']!,
		params: $page.params,
	} as const;
</script>

<section class="overflow-clip rounded-md bg-white shadow">
	<div class="rounded-t-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
		<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
			<h3 class="text-lg font-medium leading-6 text-gray-900">Balance</h3>
		</div>
	</div>

	<ul class="flex flex-col divide-y divide-gray-200 ">
		<BalanceLineItem
			href={getRoute({
				...baseRoute,
				pageType: PageTypePortfolio.Income,
			})}
		>
			<svelte:fragment slot="label">
				Lease Invoices
				<Tooltip text="Sum of all *paid* lease invoices" />
			</svelte:fragment>
			<div slot="definition">
				<span class="text-green-600">
					{balance.leaseInvoices.toLocaleString()}
				</span>
			</div>
		</BalanceLineItem>

		<BalanceLineItem
			href={getRoute({
				...baseRoute,
				pageType: PageTypePortfolio.Expenses,
			})}
		>
			<svelte:fragment slot="label">
				Expenses
				<Tooltip text="Sum of all expenses" />
			</svelte:fragment>
			<div slot="definition">
				<span class="text-red-600">{balance.expenses.toLocaleString()}</span>
			</div>
		</BalanceLineItem>

		<BalanceLineItem
			href={getRoute({
				...baseRoute,
				pageType: PageTypePortfolio.Payouts,
			})}
		>
			<svelte:fragment slot="label">
				Payouts
				<Tooltip text="Sum of all payouts" />
			</svelte:fragment>
			<div slot="definition">
				{balance.payouts.toLocaleString()}
			</div>
		</BalanceLineItem>

		<BalanceLineItem>
			<svelte:fragment slot="label">
				<div class="font-semibold text-gray-500">Balance</div>
				<Tooltip text="Balance = Lease Invoices - expenses - payouts" />
			</svelte:fragment>
			<div slot="definition">{kwdFormat(balance.total)}</div>
		</BalanceLineItem>
	</ul>
</section>

<style lang="postcss">
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
