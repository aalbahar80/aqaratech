import { CTable } from '$lib/models/classes/table.class';
import { toUTCFormat, kwdFormat } from '$lib/utils/common';
import { derived, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'owner:charts:expenses'>;

export const expenseTableHeaders = [
	{ key: 'Date' },
	{ key: 'Category', style: 'bold1' },
	{ key: 'Amount' },
	{ key: 'Location' },
	{ key: 'view', style: 'bold2' },
] as const;

export const getExpenseTableStore = (expenses: Writable<Data>) =>
	derived(expenses, ($expenses) => {
		const rows = $expenses.map((entry) => ({
			id: entry.id,
			view: `/expenses/${entry.id}`,
			Date: toUTCFormat(entry.postAt),
			Category: entry.categoryLabel || '',
			Amount: kwdFormat(entry.amount),
			Location: entry.address,
		}));
		const total = $expenses.reduce((acc, entry) => acc + entry.amount, 0);
		const table = new CTable({
			headers: expenseTableHeaders,
			rows,
			footer: {
				Amount: kwdFormat(total),
			},
		});
		return table;
	});
