<script lang="ts">
	import InvoiceCard from '$lib/components/trx/TrxCard.svelte';
	import type { LeaseInvoiceDto } from '$api/openapi';
	import { FolderAdd } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	export let invoices: LeaseInvoiceDto[];
</script>

<section class="overflow-hidden rounded-md bg-white shadow">
	<!-- Section Heading -->
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
				<slot />
			</div>
		</div>
	</div>

	{#if invoices.length}
		<!-- TODO: check user is returned to same page -->
		<ul
			id="invoiceList"
			class="divide-y divide-gray-200"
			data-uuid={invoices[0]?.leaseId}
		>
			{#each invoices as invoice (invoice.id)}
				<li in:fade|local={{ duration: 200 }} animate:flip={{ duration: 200 }}>
					<InvoiceCard {invoice} />
				</li>
			{/each}
		</ul>
	{:else}
		<!-- Empty State -->
		<div class="py-8 text-center sm:py-16">
			<Icon
				src={FolderAdd}
				class="mx-auto h-12 w-12 text-gray-400"
				aria-hidden="true"
			/>
			<h3 class="mt-2 text-sm font-medium text-gray-900">No Transactions</h3>
			<p class="mt-1 text-sm text-gray-500">Check back later.</p>
		</div>
	{/if}
</section>
