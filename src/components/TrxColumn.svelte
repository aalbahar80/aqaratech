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

<section>
	<div class="section-heading">
		<div
			class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
		>
			<div class="ml-4 mt-2">
				<h3 class="text-lg font-medium leading-6 text-gray-900">
					Transactions
				</h3>
			</div>
			<div class="ml-4 mt-2 flex-shrink-0">
				<button type="button"> Create new transaction </button>
			</div>
		</div>
	</div>

	<div class="shadow sm:hidden">
		<ul>
			{#each data as transaction (transaction.id)}
				<li>
					<a href={`/transaction/${transaction.id}`}>
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

	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th> Memo </th>
					<th> Amount </th>
					<th> Status </th>
					<th> Date </th>
					<th> Action </th>
				</tr>
			</thead>
			<tbody>
				{#each data as transaction (transaction.id)}
					<tr>
						<td>
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
						<td>
							<span class="font-medium tabular-nums text-gray-900"
								>{transaction.amount}
							</span>
							{'KWD'}
						</td>
						<td>
							<span
								class="badge"
								class:badge-green={transaction?.isPaid}
								class:badge-red={!transaction?.isPaid}
							>
								{transaction.isPaid}
							</span>
						</td>
						<td>
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

	<nav aria-label="Pagination">
		<div class="hidden sm:block">
			<p class="text-sm text-gray-700">
				Showing <span class="font-medium">{start}</span> to
				<span class="font-medium">{end}</span>
				of{' '}
				<span class="font-medium">{transactions.length}</span> results
			</p>
		</div>
		<div>
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
</section>

<style lang="postcss">
	.badge {
		@apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize;
	}
	.badge-green {
		@apply bg-green-100 text-green-800;
	}
	.badge-red {
		@apply bg-red-100 text-red-800;
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
	nav div:last-child {
		@apply flex flex-1 justify-between sm:justify-end sm:space-x-3;
	}
	table {
		@apply min-w-full divide-y divide-gray-200;
	}
	tbody {
		@apply divide-y divide-gray-200 bg-white;
	}
	tbody tr {
		@apply bg-white;
	}
	th {
		@apply bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500;
	}
	th:first-child {
		@apply text-left;
	}
	.table-container {
		@apply hidden min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:block;
	}
	li {
		@apply divide-y divide-gray-200 overflow-hidden shadow sm:hidden;
	}
	li a {
		@apply block bg-white px-4 py-4 hover:bg-gray-50;
	}
	.section-heading {
		@apply border-b border-gray-200 bg-white px-4 py-5 sm:px-6;
	}

	.section-heading button {
		@apply relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
	section {
		@apply mt-6 flex flex-col overflow-hidden shadow sm:rounded-sm;
	}
	tbody td:not(:last-child) {
		@apply whitespace-nowrap px-6 py-4 text-sm text-gray-900;
	}
	tbody td:first-child {
		@apply w-full max-w-0 text-gray-900;
	}
</style>
