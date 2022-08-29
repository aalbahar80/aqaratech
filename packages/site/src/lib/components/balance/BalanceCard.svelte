<script lang="ts">
	import BalanceLineItem from '$lib/components/balance/BalanceLineItem.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import type { BalanceDto } from '@self/sdk';

	export let balance: BalanceDto;
</script>

<section class="overflow-clip rounded-md bg-white shadow">
	<div class="rounded-t-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
		<div class="flex flex-wrap items-center justify-between sm:flex-nowrap">
			<h3 class="text-lg font-medium leading-6 text-gray-900">Balance</h3>
		</div>
	</div>

	<ul class="flex flex-col divide-y divide-gray-200 ">
		<BalanceLineItem>
			<div slot="label">Lease Invoices</div>
			<div slot="definition">
				<span class="text-green-600">
					{balance.leaseInvoices.toLocaleString()}
				</span>
			</div>
		</BalanceLineItem>

		<BalanceLineItem>
			<div slot="label">Expenses</div>
			<div slot="definition">
				<span class="text-red-600">{balance.expenses.toLocaleString()}</span>
			</div>
		</BalanceLineItem>

		<BalanceLineItem>
			<div slot="label">Payouts</div>
			<div slot="definition">
				{balance.payouts.toLocaleString()}
			</div>
		</BalanceLineItem>

		<BalanceLineItem>
			<div slot="label">
				<div class="font-semibold text-gray-500">Balance</div>
			</div>
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
