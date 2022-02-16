<script lang="ts">
	import DropDown from '$components/DropDown.svelte';
	import type { TenantBrowse } from '$lib/definitions/select';
	import { getPaginatedItems } from '$lib/utils/table-utils';
	import { Cash, ChevronRight } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import format from 'date-fns/format';
	import type { Jsonify } from 'type-fest';

	export let transactions: Jsonify<TenantBrowse>['leases'][number]['transactions'];

	let pageIndex = 1;
	let data: typeof transactions;
	let totalPages: number;
	let start: number;
	let end: number;
	$: ({ data, totalPages, start, end } = getPaginatedItems(
		transactions,
		pageIndex,
		10,
	));
</script>

<div class="mt-6 flex flex-col  overflow-hidden  shadow sm:rounded-sm">
	<div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
		<div
			class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
		>
			<div class="ml-4 mt-2">
				<h3 class="text-lg font-medium leading-6 text-gray-900">
					Transactions
				</h3>
			</div>
			<div class="ml-4 mt-2 flex-shrink-0">
				<button
					type="button"
					class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Create new transaction
				</button>
			</div>
		</div>
	</div>

	<div class="shadow sm:hidden">
		<ul
			role="list"
			class="divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
		>
			{#each data as transaction (transaction.id)}
				<li>
					<a href="#" class="block bg-white px-4 py-4 hover:bg-gray-50">
						<span class="flex items-center space-x-4">
							<span class="flex flex-1 space-x-2 truncate">
								<Icon
									src={Cash}
									theme="solid"
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								<span class="flex flex-col truncate text-sm text-gray-500">
									<span class="truncate">{transaction.memo}</span>
									<span>
										<span class="font-medium text-gray-900"
											>{transaction.amount}</span
										>{' '}
										{'KWD'}
									</span>
									<time dateTime={transaction.dueDate}
										>{format(
											new Date(transaction.createdAt),
											'MMM dd, yy',
										)}</time
									>
								</span>
							</span>
							<Icon
								src={ChevronRight}
								theme="solid"
								class="h-5 w-5 flex-shrink-0 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div class="min-w-full overflow-hidden overflow-x-auto align-middle shadow">
		<div class="hidden sm:block">
			<table class="min-w-full divide-y divide-gray-200">
				<thead>
					<tr>
						<th
							class="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Memo
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Amount
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Status
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Date
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Action
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each data as transaction (transaction.id)}
						<tr class="bg-white">
							<td
								class="w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-gray-900"
							>
								<div class="flex">
									<a
										href={`/transaction/${transaction.id}`}
										class="group inline-flex space-x-2 truncate text-sm"
									>
										<Icon
											src={Cash}
											theme="solid"
											class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
										<p class="truncate text-gray-500 group-hover:text-gray-900">
											{transaction.memo}
										</p>
									</a>
								</div>
							</td>
							<td
								class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
							>
								<span class="font-medium tabular-nums text-gray-900"
									>{transaction.amount}
								</span>
								{'KWD'}
							</td>
							<td
								class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block"
							>
								<span
									class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
									class:badge__isPaid--true={transaction?.isPaid}
									class:badge__isPaid--false={!transaction?.isPaid}
								>
									{transaction.isPaid}
								</span>
							</td>
							<td
								class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
							>
								<time dateTime={transaction.dueDate}
									>{format(new Date(transaction.createdAt), 'MMM dd, yy')}</time
								>
							</td>
							<td class="text-center">
								<DropDown />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<nav aria-label="Pagination">
		<div class="hidden sm:block">
			<p class="text-sm text-gray-700">
				Showing <span class="font-medium">{start}</span> to
				<span class="font-medium">{end}</span>
				of{' '}
				<span class="font-medium">{transactions.length}</span> results
			</p>
		</div>
		<div class="flex flex-1 justify-between sm:justify-end sm:space-x-3">
			<button
				disabled={pageIndex <= 1}
				on:click={() => pageIndex > 1 && pageIndex--}
			>
				Previous
			</button>
			<button
				disabled={pageIndex >= totalPages}
				on:click={() => pageIndex < totalPages && pageIndex++}
			>
				Next
			</button>
		</div>
	</nav>
</div>

<style lang="postcss">
	.badge__isPaid--true {
		@apply bg-green-100 text-green-800;
	}
	.badge__isPaid--false {
		@apply bg-gray-100 text-gray-800;
	}
	nav {
		@apply flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6;
	}
	nav button {
		@apply relative inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700;
	}
	nav button:disabled {
		@apply cursor-not-allowed opacity-50;
	}
	nav button:hover {
		@apply text-gray-500 sm:bg-gray-50 sm:text-gray-700;
	}
</style>
