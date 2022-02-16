<script context="module" lang="ts">
	import DropDown from '$components/DropDown.svelte';
	import type { TransactionData } from '$lib/definitions/select';
	import { Cash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Load } from '@sveltejs/kit';
	import format from 'date-fns/format';
	import parseISO from 'date-fns/parseISO';
	import type { Jsonify } from 'type-fest';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/transaction.json');
		const leases = await fetch('/lease.json')
			.then((res) => res.json())
			.then((data) => data.rows);
		const data = await res.json();

		return {
			props: {
				transactions: data.rows,
				leases,
			},
		};
	};
</script>

<script lang="ts">
	import LeasesCard from '$components/LeasesCard.svelte';

	export let transactions: Jsonify<TransactionData[]>;
	export let leases;
</script>

<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
	<LeasesCard {leases} />
	<div class="mt-2 flex flex-col">
		<div
			class="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg"
		>
			<table class="min-w-full divide-y divide-gray-200">
				<thead>
					<tr>
						<th
							class="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Transaction
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Amount
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
						>
							Status
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
						>
							Date
						</th>
						<th
							class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 "
						>
							Action
						</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200 bg-white">
					{#each transactions as transaction (transaction.id)}
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
									class:badge__isPaid--true={transaction?.isPaid ?? false}
									class:badge__isPaid--false={!transaction?.isPaid ?? false}
								>
									{transaction.isPaid}
								</span>
							</td>
							<td
								class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
							>
								<time dateTime={transaction.dueDate}
									>{format(parseISO(transaction.createdAt), 'MMM dd, yy')}</time
								>
							</td>
							<td class="text-center">
								<DropDown />
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
			<!-- {/* Pagination */} -->
			<nav
				class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
				aria-label="Pagination"
			>
				<div class="hidden sm:block">
					<p class="text-sm text-gray-700">
						Showing <span class="font-medium">1</span> to
						<span class="font-medium">10</span>
						of{' '}
						<span class="font-medium">20</span> results
					</p>
				</div>
				<div class="flex flex-1 justify-between sm:justify-end">
					<button
						href="#"
						class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Previous
					</button>
					<button
						href="#"
						class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						Next
					</button>
				</div>
			</nav>
		</div>
	</div>
</div>

<style lang="postcss">
	.badge__isPaid--true {
		@apply bg-green-100 text-green-800;
	}
	.badge__isPaid--false {
		@apply bg-gray-100 text-gray-800;
	}
</style>
