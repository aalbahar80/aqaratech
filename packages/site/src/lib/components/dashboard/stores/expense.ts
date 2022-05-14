import type { InferQueryOutput } from '$lib/client/trpc';
import { Property } from '$lib/models/classes/property.class';
import { dateFormat, kwdFormat } from '$lib/utils/common';
import { derived, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'owner:charts:expenses'>;

export const expenseTableHeaders = [
	{
		key: 'Date',
	},
	{
		key: 'Category',
		style: 'bold1' as const,
	},
	{
		key: 'Amount',
	},
	{
		key: 'Location',
	},
];

export const getExpenseTableData = (expenses: Writable<Data>) =>
	derived(expenses, ($expenses) =>
		$expenses.map((entry) => ({
			id: entry.id,
			Date: dateFormat(entry.postAt),
			Category: entry.category,
			Amount: kwdFormat(entry.amount),
			Location: entry.relatedProperty
				? Property.getLabel(entry.relatedProperty)
				: '-',
		})),
	);

export const getExpenseTableTotals = (expenses: Writable<Data>) =>
	derived(expenses, ($expenses) => {
		const total = $expenses.reduce((acc, entry) => acc + entry.amount, 0);
		return {
			Amount: kwdFormat(total),
		};
	});
