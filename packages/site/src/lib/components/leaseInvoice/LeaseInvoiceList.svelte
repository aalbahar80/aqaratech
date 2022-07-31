<script lang="ts">
	import LeaseInvoiceCard from '$components/leaseInvoice/LeaseInvoiceCard.svelte';
	import AddInvoiceButton from '$lib/components/leaseInvoice/AddInvoiceButton.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { create } from '$lib/utils/route-helpers';
	import type { PaginatedLeaseInvoiceDto } from '@self/sdk';

	export let leaseId: string | undefined = undefined;
	export let leaseInvoices: PaginatedLeaseInvoiceDto;
</script>

<!-- TODO handle pagination -->
<StackedList
	entityTitle="leaseInvoices"
	count={leaseInvoices.results.length}
	formUrl={create({
		entity: 'leaseInvoices',
		predefined: new Map([['leaseId', leaseId]]),
	})}
>
	<div slot="actions">
		{#if leaseId}
			<AddInvoiceButton {leaseId} />
		{/if}
	</div>
	{#each leaseInvoices.results as invoice (invoice.id)}
		<li>
			<LeaseInvoiceCard
				{invoice}
				on:delete={(e) => {
					leaseInvoices.results = leaseInvoices.results.filter(
						(r) => r.id !== e.detail.id,
					);
				}}
			/>
		</li>
	{/each}
	<AnchorPagination pagination={leaseInvoices.pagination} />
</StackedList>
