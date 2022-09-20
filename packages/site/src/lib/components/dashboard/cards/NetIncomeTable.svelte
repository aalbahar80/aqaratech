<script lang="ts">
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { ByMonthDto } from '$api/openapi';

	export let invoicesGrouped: ByMonthDto[];
	export let expensesGrouped: ByMonthDto[];

	$: tabular = invoicesGrouped.map((i, index) => {
		const expense = expensesGrouped[index]?.amount || 0;
		return {
			id: { label: i.date, hide: true },
			date: { label: toUTCFormat(new Date(i.date)) },
			income: {
				label: kwdFormat(i.amount),
				extraStyles: ['tabular-nums', 'slashed-zero'],
			},
			expense: {
				label: kwdFormat(expense),
				extraStyles: ['text-red-600', 'tabular-nums', 'slashed-zero'],
			},
			net: {
				label: kwdFormat(i.amount - expense),
				extraStyles: ['tabular-nums', 'slashed-zero'],
			},
		};
	});

	const headers: TableHeader[] = [
		{ key: 'date', label: 'Date' },
		{ key: 'income', label: 'Income' },
		{ key: 'expense', label: 'Expenses' },
		{ key: 'net', label: 'Net', style: 'bold1' },
	];

	$: footer = {
		date: 'Total for period',
		income: kwdFormat(invoicesGrouped.reduce((acc, i) => acc + i.amount, 0)),
		expense: kwdFormat(expensesGrouped.reduce((acc, i) => acc + i.amount, 0)),
		net: kwdFormat(
			invoicesGrouped.reduce((acc, i) => acc + i.amount, 0) -
				expensesGrouped.reduce((acc, i) => acc + i.amount, 0),
		),
	};

	$: table = new CTable({
		headers,
		rows: tabular || [],
		footer,
	});
</script>

<CondensedTable {table} />
