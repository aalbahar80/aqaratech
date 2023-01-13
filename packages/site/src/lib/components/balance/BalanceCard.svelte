<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageTypePortfolio } from '@self/utils';

	import L, { locale } from '$i18n/i18n-svelte';
	import BalanceLineItem from '$lib/components/balance/BalanceLineItem.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { kwdFormat } from '$lib/utils/common';

	import type { BalanceDto } from '$api/openapi';

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
			<h3 class="text-lg font-medium leading-6 text-gray-900">
				{$L.general.balance()}
			</h3>
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
				{$L.entity.leaseInvoice.plural()}
				<Tooltip text="Sum of all *paid* lease invoices" />
			</svelte:fragment>
			<div slot="definition">
				<span class="text-green-600">
					{new Intl.NumberFormat($locale, {
						style: 'currency',
						currency: 'KWD',
					}).format(balance.leaseInvoices)}
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
				{$L.entity.expense.plural()}
				<Tooltip text="Sum of all expenses" />
			</svelte:fragment>
			<div slot="definition">
				<span class="text-red-600">
					{new Intl.NumberFormat($locale, {
						style: 'currency',
						currency: 'KWD',
					}).format(balance.expenses)}
				</span>
			</div>
		</BalanceLineItem>

		<BalanceLineItem
			href={getRoute({
				...baseRoute,
				pageType: PageTypePortfolio.PayoutsTable,
			})}
		>
			<svelte:fragment slot="label">
				{$L.entity.payout.plural()}
				<Tooltip text="Sum of all payouts" />
			</svelte:fragment>
			<div slot="definition">
				{new Intl.NumberFormat($locale, {
					style: 'currency',
					currency: 'KWD',
				}).format(balance.payouts)}
			</div>
		</BalanceLineItem>

		<BalanceLineItem>
			<svelte:fragment slot="label">
				<div class="font-semibold text-gray-500">{$L.general.balance()}</div>
				<Tooltip text="Balance = Lease Invoices - expenses - payouts" />
			</svelte:fragment>
			<div slot="definition">
				{new Intl.NumberFormat($locale, {
					style: 'currency',
					currency: 'KWD',
				}).format(balance.total)}
			</div>
		</BalanceLineItem>
	</ul>
</section>

<style lang="postcss">
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
