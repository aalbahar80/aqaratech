<script lang="ts">
	import type { PaginatedLeaseInvoiceDto } from '$api/openapi';
	import { page } from '$app/stores';
	import LeaseInvoiceCard from '$components/leaseInvoice/LeaseInvoiceCard.svelte';
	import AddInvoiceButton from '$lib/components/leaseInvoice/AddInvoiceButton.svelte';
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { getRoute, PageType } from '@self/utils';

	export let leaseId: string | undefined = undefined;
	export let leaseInvoices: PaginatedLeaseInvoiceDto;
</script>

<!-- TODO handle pagination -->
<StackedList
	entity="leaseInvoice"
	count={leaseInvoices.results.length}
	formButtonProps={{
		entity: 'leaseInvoice',
		formUrl: getRoute({
			entity: 'leaseInvoice',
			pageType: PageType.New,
			params: $page.params,
			predefined: { leaseId },
		}),
	}}
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
