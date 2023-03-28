<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';

	import { page } from '$app/stores';

	import PortfolioSelect from '$lib/components/dashboard/filter/PortfolioSelect.svelte';
	import DueStatusPie from '$lib/components/leaseInvoice/DueStatusPie.svelte';
	import { getOrganizationInvoices } from '$lib/components/leaseInvoice/get-invoices';
	import PaymentStatusPie from '$lib/components/leaseInvoice/PaymentStatusPie.svelte';
	import PaymentTimePie from '$lib/components/leaseInvoice/PaymentTimePie.svelte';

	const query = createQuery({
		queryKey: ['getOrganizationInvoices'],
		queryFn: async () =>
			await getOrganizationInvoices({
				organizationId: $page.params['organizationId']!,
			}),
	});
</script>

<PortfolioSelect />

{#if $query.data}
	<div class="flex flex-col gap-4 sm:flex-row">
		<PaymentStatusPie aggregate={$query.data.aggregate} />

		<PaymentTimePie aggregate={$query.data.aggregate} />

		<DueStatusPie aggregate={$query.data.aggregate} />
	</div>
{/if}
