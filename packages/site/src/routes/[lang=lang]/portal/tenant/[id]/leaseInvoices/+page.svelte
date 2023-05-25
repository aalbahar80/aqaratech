<script lang="ts">
	import { createColumnHelper, renderComponent } from '@tanstack/svelte-table';

	import type { PageData } from './$types';
	import { getPayURL } from '@self/utils';

	import type { LeaseInvoiceDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import LeaseInvoiceTable from '$lib/components/leaseInvoice/LeaseInvoiceTable.svelte';
	import GenericActionCell from '$lib/components/table/tanstack-table/GenericActionCell.svelte';
	import { environment } from '$lib/environment';

	export let data: PageData;

	const columnHelper = createColumnHelper<LeaseInvoiceDto>();
</script>

<p>{$L.misc.welcome()}</p>
<h3>{$L.misc.tenantInvoicePage()}</h3>

<LeaseInvoiceTable
	data={data.invoices}
	extraColumns={[
		columnHelper.display({
			id: 'pay',
			header: '',
			cell: (props) => {
				const invoice = props.row.original;

				return renderComponent(GenericActionCell, {
					options: {
						element: 'a',
						label: $L.buttons.pay(),
						disabled: invoice.isPaid,
						href: getPayURL({
							invoiceId: invoice.id,
							apiURL: environment.PUBLIC_API_URL,
						}),
					},
				});
			},
		}),
	]}
/>
