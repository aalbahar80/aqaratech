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

	<ul class="flex flex-col divide-y divide-gray-200 ">
		<li class="balance-item">
			<a href="#1">
				<dt>Lease Invoices</dt>
				<dd>{balance.leaseInvoices.toLocaleString()}</dd>
			</a>
		</li>

		<li class="balance-item">
			<a href="#1">
				<dt>Expenses</dt>
				<dd class="text-green-50">{balance.expenses.toLocaleString()}</dd>
			</a>
		</li>

		<li class="balance-item">
			<a href="#1">
				<dt>Payouts</dt>
				<dd>{balance.payouts.toLocaleString()}</dd>
			</a>
		</li>

		<li class="total">
			<div>
				<dt>Total</dt>
				<dd>{kwdFormat(balance.total)}</dd>
			</div>
		</li>
	</ul>
</section>

<style lang="postcss">
	.balance-item,
	.total {
		@apply justify-between;
	}

	.balance-item {
		@apply odd:bg-gray-50 even:bg-white;
	}

	.balance-item a,
	.total div {
		@apply flex justify-between p-4 sm:px-6;
	}

	a {
		@apply hover:bg-gray-100;
	}

	.balance-item dt {
		@apply text-sm font-medium text-gray-500;
	}

	.total dt {
		@apply font-semibold text-gray-500;
	}

	.balance-item dd,
	.total dd {
		@apply text-sm font-medium tabular-nums text-gray-500;
	}

	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
