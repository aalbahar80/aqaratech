<script lang="ts">
	import { page, session } from '$app/stores';
	import Dropdown from '$components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import { addToast } from '$lib/stores/toast';
	import { classes } from '$lib/utils/classes';
	import { toUTCFormat } from '$lib/utils/common';
	import { copyTrxUrl } from '$lib/utils/copy-trx-url';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedLeaseInvoiceDto } from '@self/sdk';
	import {
		Check,
		ChevronRight,
		ClipboardCopy,
		Eye,
		X,
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import * as R from 'remeda';
	import { scale } from 'svelte/transition';
	import TeenyiconsReceiptSolid from '~icons/teenyicons/receipt-solid';
	import Chip from '../Chip.svelte';

	export let invoices: PaginatedLeaseInvoiceDto;
	export let leaseId: string | undefined = undefined;

	const hideActions = $session.user?.role.roleType !== 'ORGADMIN';
	const formUrl = create({
		entity: 'leaseInvoices',
		predefined: new Map([['leaseId', leaseId]]),
	});

	const togglePaid = async (id: string, isPaid: boolean) => {
		try {
			const updated = await $page.stuff.api.leaseInvoices.update({
				id,
				updateLeaseInvoiceDto: { isPaid },
			});

			// update invoices array
			invoices.results = invoices.results.map((invoice) =>
				invoice.id === id
					? {
							...invoice,
							...updated,
					  }
					: invoice,
			);
		} catch (err) {
			if (R.isError(err)) {
				addToast({
					props: {
						kind: 'error',
						title: `Error: ${err.name}`,
						subtitle: JSON.stringify(err.message),
					},
				});
			}
		}
	};

	// TODO get from server
	$: balance = invoices.results.reduce((total, invoice) => {
		if (!invoice.isPaid) {
			total -= invoice.amount;
		}
		return total;
	}, 0);
</script>

<section>
	{#if invoices.results.length}
		<!-- Section heading -->
		<div class="section-heading">
			<div
				class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
			>
				<div class="ml-4 mt-2">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Invoices</h3>
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
						<a href={formUrl}> Create new invoice </a>
					</div>
				{/if}
			</div>
		</div>

		<!-- List for small screens -->
		<ul>
			{#each invoices.results as invoice (invoice.id)}
				<li>
					<!-- class="block bg-white px-4 py-4" -->
					<svelte:element
						this={hideActions ? 'div' : 'a'}
						class={classes(
							hideActions ? '' : 'hover:bg-gray-50',
							'block bg-white px-4 py-4',
						)}
						href={`/invoices/${invoice.id}`}
					>
						<span class="flex items-center space-x-4">
							<span class="flex flex-1 space-x-2 truncate">
								<TeenyiconsReceiptSolid
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								<span class="flex flex-col truncate text-sm text-gray-500">
									<span class="truncate">{invoice.memo || ''}</span>
									<span>
										<span class="font-medium text-gray-900"
											>{invoice.amount}</span
										>{' '}
										{'KWD'}
									</span>
									<time dateTime={invoice.postAt.toISOString()}
										>{toUTCFormat(invoice.postAt)}</time
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
								<Chip {...getInvoiceBadge(invoice)} />
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
					{#each invoices.results as invoice (invoice.id)}
						{@const chip = getInvoiceBadge(invoice)}
						<tr>
							<td>
								<div class="flex">
									<svelte:element
										this={hideActions ? 'div' : 'a'}
										href={`/invoices/${invoice.id}`}
										class="inline-flex space-x-2 truncate text-sm"
										class:group={!hideActions}
									>
										<TeenyiconsReceiptSolid
											class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
										<p class="truncate text-gray-500 group-hover:text-gray-900">
											{invoice.memo || ''}
										</p>
									</svelte:element>
								</div>
							</td>
							<td class="text-right">
								<span class="font-medium tabular-nums text-gray-900"
									>{invoice.amount.toLocaleString()}
								</span>
								{'KWD'}
							</td>
							<td>
								{#key invoice.isPaid}
									<div in:scale>
										<Chip {...chip} />
									</div>
								{/key}
							</td>
							<td>
								<time dateTime={invoice.postAt.toISOString()}
									>{toUTCFormat(invoice.postAt)}</time
								>
							</td>
							{#if hideActions}
								<!-- To get around :last-child css selector -->
								<td />
							{:else}
								<td class="text-center">
									<Dropdown>
										<div slot="menu">
											<DropdownMenu
												class="bottom-10"
												options={[
													{
														icon: Eye,
														label: 'View',
														href: `/${entityNameMap.leaseInvoices.urlName}/${invoice.id}`,
													},
													// {
													// 	icon: PencilAlt,
													// 	label: 'Edit',
													// 	href: `/${entityNameMap.leaseInvoices.urlName}/${invoice.id}/edit`,
													// },
													{
														icon: ClipboardCopy,
														label: 'Copy payment URL',
														onClick: () => {
															copyTrxUrl(invoice.id, $page.url.origin);
														},
													},
													invoice.isPaid
														? {
																icon: X,
																label: 'Mark as unpaid',
																onClick: async () => {
																	await togglePaid(invoice.id, false);
																},
														  }
														: {
																icon: Check,
																label: 'Mark as paid',
																onClick: async () => {
																	await togglePaid(invoice.id, true);
																},
														  },
												]}
											/>
										</div>
									</Dropdown>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<Pagination pagination={invoices.pagination} />
	{:else}
		<EmptyState nameMap={entityNameMap.leaseInvoices} {formUrl} />
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
