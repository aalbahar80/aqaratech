<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import ActionButton from '$lib/components/table/tanstack-table/ActionButton.svelte';

	import type { LeaseInvoiceDto } from '$api/openapi';

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
						// eslint-disable-next-line @typescript-eslint/no-empty-function
						onClick: () => {},
					},
				});
			},
		}),
	]}
/>
