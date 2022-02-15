<script context="module" lang="ts">
	import type { TransactionData } from '$lib/definitions/select';
	import { Cash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Load } from '@sveltejs/kit';
	import format from 'date-fns/format';
	import parseISO from 'date-fns/parseISO';
	import type { Jsonify } from 'type-fest';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/transaction.json');
		const data = await res.json();

		return {
			props: {
				transactions: data.rows,
			},
		};
	};
</script>

<script lang="ts">
	export let transactions: Jsonify<TransactionData[]>;

	const statusStyles = {
		true: 'bg-green-100 text-green-800',
		false: 'bg-gray-100 text-gray-800',
	};

	function classes(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<div class="hidden sm:block">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
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
								class="hidden bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:block"
							>
								Status
							</th>
							<th
								class="bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
							>
								Date
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
											<p
												class="truncate text-gray-500 group-hover:text-gray-900"
											>
												{transaction.memo}
											</p>
										</a>
									</div>
								</td>
								<td
									class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
								>
									<span class="font-medium text-gray-900"
										>{transaction.amount}
									</span>
									{'KWD'}
								</td>
								<td
									class="hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block"
								>
									<span
										class={classes(
											statusStyles[transaction?.isPaid ?? false],
											'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize',
										)}
									>
										{transaction.isPaid}
									</span>
								</td>
								<td
									class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500"
								>
									<time dateTime={transaction.dueDate}
										>{format(
											parseISO(transaction.createdAt),
											'MMM dd, yy',
										)}</time
									>
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
						<a
							href="#"
							class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							Previous
						</a>
						<a
							href="#"
							class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
						>
							Next
						</a>
					</div>
				</nav>
			</div>
		</div>
	</div>
</div>

<!-- <div class="min-h-screen bg-gray-100">
	<div class="py-6">
		<div
			class="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8"
		>
			<div class="hidden lg:col-span-3 lg:block xl:col-span-2">
				<nav aria-label="Sidebar" class="sticky top-6 divide-y divide-gray-300">
					<Descripiton />
				</nav>
			</div>
			<main class="lg:col-span-9 xl:col-span-6">
				<TrxColumn />
				<Descripiton />
			</main>
			<aside class="hidden xl:col-span-4 xl:block">
				<div class="sticky top-6 space-y-4">
					<LeaseCard />
				</div>
			</aside>
		</div>
	</div>
</div> -->
