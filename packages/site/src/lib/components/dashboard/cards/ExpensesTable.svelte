<script lang="ts">
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import type { PaginatedExpenseDto } from '@self/sdk';

	export let expenses: PaginatedExpenseDto;

	$: tabular = expenses.results.map((i) => {
		return {
			id: { label: i.id, hide: true },
			postAt: { label: i.postAt.toISOString() },
			amount: { label: i.amount },
			// type: { label: i.expenseType.labelEn },
			type: { label: 'Capex' },
			// property: {
			// 	label: i.breadcrumbs?.property?.label,
			// 	href: i.breadcrumbs?.property?.href,
			// },
			// unit: {
			// 	label: i.breadcrumbs?.unit?.label,
			// 	href: i.breadcrumbs?.unit?.href,
			// },
			view: {
				label: 'View',
				href: `/expenses/${i.id}`,
			},
		};
	});

	const headers: TableHeader[] = [
		{ key: 'postAt', label: 'Date' },
		{ key: 'type', label: 'Category', style: 'bold1' },
		{ key: 'amount', label: 'Amount' },
		// { key: 'unit', label: 'Unit', isHref: true, style: 'regular' },
		// { key: 'property', label: 'Property', style: 'regular' },
		{ key: 'view', label: 'View', isHref: true, hide: true },
	];

	$: footer = {
		amount: expenses.results.reduce((acc, i) => acc + i.amount, 0),
	};

	$: table = new CTable({
		headers,
		rows: tabular || [],
		footer,
	});
</script>

<CondensedTable {table} />
