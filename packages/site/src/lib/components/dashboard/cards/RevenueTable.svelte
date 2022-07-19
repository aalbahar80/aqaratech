<script lang="ts">
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { PaginatedLeaseInvoiceDto } from '@self/sdk';

	export let invoices: PaginatedLeaseInvoiceDto;

	$: tabular = invoices.results.map((i) => {
		return {
			id: { label: i.id, hide: true },
			postAt: { label: toUTCFormat(i.postAt) },
			amount: { label: kwdFormat(i.amount), extraStyles: ['tabular-nums'] },
			status: {
				label: i.isPaid ? 'Paid' : 'Unpaid',
				extraStyles: i.isPaid ? ['text-green-600'] : ['text-red-600'],
			},
			property: {
				label: i.breadcrumbs.property.label,
				href: i.breadcrumbs.property.href,
			},
			unit: {
				label: i.breadcrumbs.unit.label,
				href: i.breadcrumbs.unit.href,
			},
			view: {
				label: 'View',
				href: `/invoices/${i.id}`,
			},
		};
	});

	const headers: TableHeader[] = [
		{ key: 'postAt', label: 'Date' },
		{ key: 'status', label: 'Status', style: 'bold1' },
		{ key: 'amount', label: 'Amount' },
		{ key: 'unit', label: 'Unit', isHref: true, style: 'regular' },
		{ key: 'property', label: 'Property', style: 'regular' },
		{ key: 'view', label: 'View', isHref: true, hide: true },
	];

	$: footer = {
		amount: invoices.results.reduce((acc, i) => acc + i.amount, 0),
	};

	$: table = new CTable({
		headers,
		rows: tabular || [],
		footer,
	});
</script>

<CondensedTable {table} />
