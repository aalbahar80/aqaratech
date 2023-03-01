<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import type { PageData } from './$types';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import GenericActionCell from '$lib/components/table/tanstack-table/GenericActionCell.svelte';

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

				return renderComponent(GenericActionCell, {
					options: {
						element: 'button',
						label: $L.buttons.pay(),
						disabled: true, // TODO payment
						// eslint-disable-next-line @typescript-eslint/no-empty-function
						onClick: () => {},
					},
				});
			},
		}),
	]}
/>
