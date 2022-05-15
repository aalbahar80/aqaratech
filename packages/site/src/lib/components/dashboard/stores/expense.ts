import type { InferQueryOutput } from '$lib/client/trpc';
import { Property } from '$lib/models/classes/property.class';
import { dateFormat, kwdFormat } from '$lib/utils/common';
import { derived, type Writable } from 'svelte/store';
import { CTable } from '$lib/models/classes/table.class';

type Data = InferQueryOutput<'owner:charts:expenses'>;

export const expenseTableHeaders = [
	{
		key: 'Date' as const,
	},
	{
		key: 'Category' as const,
		style: 'bold1' as const,
	},
	{
		key: 'Amount' as const,
	},
	{
		key: 'Location' as const,
	},
];

export const getExpenseTableStore = (expenses: Writable<Data>) =>
	derived(expenses, ($expenses) => {
		const rows = $expenses.map((entry) => ({
			id: entry.id,
			Date: dateFormat(entry.postAt),
			Category: entry.category || '',
			Amount: kwdFormat(entry.amount),
			Location: entry.relatedProperty
				? Property.getLabel(entry.relatedProperty)
				: '-',
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
