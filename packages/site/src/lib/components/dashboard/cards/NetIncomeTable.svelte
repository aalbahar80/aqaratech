<script lang="ts">
	import CondensedTable from '$lib/components/table/CondensedTable.svelte';
	import { CTable, type TableHeader } from '$lib/models/classes/table.class';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import type { ByMonthDto } from '@self/sdk';

	export let income: ByMonthDto[];
	export let expenses: ByMonthDto[];

	$: tabular = income.map((i, index) => {
		const expense = expenses[index]?.amount || 0;
		return {
			id: { label: i.date, hide: true },
			date: { label: toUTCFormat(new Date(i.date)) },
			income: { label: kwdFormat(i.amount) },
			expense: { label: kwdFormat(expense), extraStyles: ['text-red-600'] },
			net: { label: kwdFormat(i.amount - expense) },
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
		income: kwdFormat(income.reduce((acc, i) => acc + i.amount, 0)),
		expense: kwdFormat(expenses.reduce((acc, i) => acc + i.amount, 0)),
		net: kwdFormat(
			income.reduce((acc, i) => acc + i.amount, 0) -
				expenses.reduce((acc, i) => acc + i.amount, 0),
		),
	};

	$: table = new CTable({
		headers,
		rows: tabular || [],
		footer,
	});
</script>

<CondensedTable {table} />
