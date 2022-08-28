<script lang="ts">
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

	<ul
		class="flex flex-col divide-y divide-gray-200 odd:bg-green-50 even:bg-white"
	>
		<li class="balance-item">
			<a href="#1">
				<dt>Lease Invoices</dt>
				<dd>{kwdFormat(balance.leaseInvoices)}</dd>
			</a>
		</li>

		<li class="balance-item">
			<a href="#1">
				<dt>Expenses</dt>
				<dd>{kwdFormat(balance.expenses)}</dd>
			</a>
		</li>

		<li class="balance-item">
			<a href="#1">
				<dt>Payouts</dt>
				<dd>{kwdFormat(balance.payouts)}</dd>
			</a>
		</li>

		<li class="balance-item">
			<a href="#1">
				<dt>Total</dt>
				<dd>{kwdFormat(balance.total)}</dd>
			</a>
		</li>
	</ul>
</section>

<style lang="postcss">
	.balance-item {
		@apply justify-between p-4 hover:bg-gray-50;
	}
	.balance-item a {
		@apply flex justify-between;
	}

	dt {
		@apply text-sm font-medium text-gray-500;
	}

	dd {
		@apply text-sm font-medium tabular-nums text-gray-900;
	}

	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
