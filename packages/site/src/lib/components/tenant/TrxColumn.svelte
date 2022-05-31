<script lang="ts">
	import { page, session } from '$app/stores';
	import DropDown from '$components/DropDown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import { Transaction } from '$lib/models/classes/transaction.class';
	import { addToast } from '$lib/stores/toast';
	import { classes } from '$lib/utils';
	import { dateFormat } from '$lib/utils/common';
	import { copyTrxUrl } from '$lib/utils/copy-trx-url';
	import { getPaginatedItems } from '$lib/utils/table-utils';
	import { ChevronRight, ClipboardCopy, Eye } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { scale } from 'svelte/transition';
	import TeenyiconsReceiptSolid from '~icons/teenyicons/receipt-solid';
	import Chip from '../Chip.svelte';

	type Transactions = NonNullable<
		InferQueryOutput<'tenants:read'>
	>['leases'][number]['transactions'];
	export let transactions: Transactions;
	export let leaseId: string | undefined = undefined;

	const hideActions = !$session.authz?.isAdmin;
	let pageIndex = 1;
	let data: typeof transactions;
	let totalPages: number;
	let start: number;
	let end: number;
	$: ({ data, totalPages, start, end } = getPaginatedItems(
		transactions,
		pageIndex,
		12,
	));

	const togglePaid = async (id: string, isPaid: boolean) => {
		try {
			const updated = await trpc().mutation('transactions:updatePaid', {
				id,
				isPaid,
			});
			// update transactions array
			transactions = transactions.map((transaction) =>
				transaction.id === id
					? {
							...transaction,
							...updated,
					  }
					: transaction,
			);
		} catch (e) {
			console.error(e);
			addToast({
				props: {
					kind: 'error',
					title: 'Unable to update status',
				},
			});
		}
	};

	$: balance = transactions.reduce((total, transaction) => {
		if (!transaction.isPaid) {
			total -= transaction.amount;
		}
		return total;
	}, 0);
</script>

<section>
	{#if transactions.length}
		<!-- Section heading -->
		<div class="section-heading">
			<div
				class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
			>
				<div class="ml-4 mt-2">
					<h3 class="text-lg font-medium leading-6 text-gray-900">
						Transactions
					</h3>
				</div>
				<div>
					<dt class="truncate text-sm font-medium text-gray-500">
						Outstanding balance
					</dt>
					{#key balance}
						<dd in:scale class="mt-1 text-3xl font-semibold text-gray-900">
							{balance}
						</dd>
					{/key}
				</div>
				{#if leaseId && !hideActions}
					<div class="ml-4 mt-2 flex-shrink-0">
						<a href={`/new/transactions?leaseId=${leaseId}`}>
							Create new transaction
						</a>
					</div>
				{/if}
			</div>
		</div>

		<!-- List for small screens -->
		<ul>
			{#each data as transaction (transaction.id)}
				<li>
					<!-- class="block bg-white px-4 py-4" -->
					<svelte:element
						this={hideActions ? 'div' : 'a'}
						class={classes(
							hideActions ? '' : 'hover:bg-gray-50',
							'block bg-white px-4 py-4',
						)}
						href={`/transactions/${transaction.id}`}
					>
						<span class="flex items-center space-x-4">
							<span class="flex flex-1 space-x-2 truncate">
								<TeenyiconsReceiptSolid
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								<span class="flex flex-col truncate text-sm text-gray-500">
									<span class="truncate">{transaction.memo || ''}</span>
									<span>
										<span class="font-medium text-gray-900"
											>{transaction.amount}</span
										>{' '}
										{'KWD'}
									</span>
									<time dateTime={transaction.postAt.toISOString()}
										>{dateFormat(transaction.postAt)}</time
									>
								</span>
							</span>
							{#if !hideActions}
								<Icon
									src={ChevronRight}
									theme="solid"
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
							{:else}
								<Chip {...Transaction.getBadge(transaction)} />
							{/if}
						</span>
					</svelte:element>
				</li>
			{/each}
		</ul>

		<!-- List for non-small screens -->
		<div class="table-container">
			<table>
				<thead>
					<tr>
						<th> Memo </th>
						<th> Amount </th>
						<th> Status </th>
						<th> Date </th>
						{#if !hideActions}
							<th> Actions </th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each data as transaction (transaction.id)}
						{@const chip = Transaction.getBadge(transaction)}
						<tr>
							<td>
								<div class="flex">
									<svelte:element
										this={hideActions ? 'div' : 'a'}
										href={`/transactions/${transaction.id}`}
										class="inline-flex space-x-2 truncate text-sm"
										class:group={!hideActions}
									>
										<TeenyiconsReceiptSolid
											class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
										<p class="truncate text-gray-500 group-hover:text-gray-900">
											{transaction.memo || ''}
										</p>
									</svelte:element>
								</div>
							</td>
							<td class="text-right">
								<span class="font-medium tabular-nums text-gray-900"
									>{transaction.amount.toLocaleString()}
								</span>
								{'KWD'}
							</td>
							<td>
								{#key transaction.isPaid}
									<div in:scale>
										<Chip {...chip} />
									</div>
								{/key}
							</td>
							<td>
								<time dateTime={transaction.postAt.toISOString()}
									>{dateFormat(transaction.postAt)}</time
								>
							</td>
							{#if hideActions}
								<!-- To get around :last-child css selector -->
								<td />
							{:else}
								<td class="text-center">
									<DropDown
										options={[
											{
												icon: Eye,
												label: 'View',
												href: `/transactions/${transaction.id}`,
											},
											// {
											// 	icon: PencilAlt,
											// 	label: 'Edit',
											// 	href: `/transactions/${transaction.id}/edit`,
											// },
											{
												icon: ClipboardCopy,
												label: 'Copy payment URL',
												onClick: () => {
													console.log($page);
													copyTrxUrl(transaction.id, $page.url.origin);
												},
											},
										]}
									/>
								</td>
							{/if}
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
	{:else}
		<EmptyState
			entity={Transaction}
			createHref={`/new/transactions?leaseId=${leaseId}`}
		/>
	{/if}
</section>

<style lang="postcss">
	section {
		@apply flex flex-col rounded-md shadow;
	}
	.section-heading {
		@apply rounded-t-md border-b border-gray-200 bg-white px-4 py-5 sm:px-6;
	}
	.section-heading a {
		@apply relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
	nav {
		@apply flex items-center justify-between rounded-b-md border-t border-gray-200 bg-white px-4 py-3 sm:px-6;
	}
	nav div:last-child {
		@apply flex flex-1 justify-between sm:justify-end sm:space-x-3;
	}
	nav button {
		@apply relative inline-flex w-32 items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700;
	}
	nav button:hover {
		@apply text-gray-500 sm:bg-gray-50 sm:text-gray-700;
	}
	nav button:disabled {
		@apply cursor-not-allowed opacity-50;
	}
	.table-container {
		@apply hidden min-w-full align-middle shadow sm:block;
	}
	table {
		@apply min-w-full divide-y divide-gray-200;
	}
	tbody {
		@apply divide-y divide-gray-200 bg-white;
	}
	th {
		@apply bg-gray-50 px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500;
	}
	th:first-child {
		@apply text-left;
	}
	tbody tr {
		@apply bg-white;
	}
	tbody td:not(:last-child) {
		@apply whitespace-nowrap px-6 py-4 text-sm text-gray-900;
	}
	tbody td:first-child {
		@apply w-full max-w-0 text-gray-900;
	}
	ul {
		@apply divide-y divide-gray-200 overflow-hidden sm:hidden;
	}
</style>
