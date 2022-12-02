<script lang="ts">
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';
	import type { LeaseInvoiceDto } from '$api/openapi';
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();
</script>

<LeaseInvoiceTable
	data={data.invoices}
	extraColumns={[
		columnHelper.display({
			id: 'pay',
			header: '',
			cell: () => {
				// const invoice = props.row.original;

				return renderComponent(ActionButton, {
					options: {
						label: 'Pay now',
						disabled: true, // TODO payment
						onClick: () => {},
					},
				});
			},
		}),
	]}
/>
