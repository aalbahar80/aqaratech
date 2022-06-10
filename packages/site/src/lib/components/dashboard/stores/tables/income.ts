import type { InferQueryOutput } from '$lib/client/trpc';
import { CTable } from '$lib/models/classes/table.class';
import { toUTCFormat, kwdFormat } from '$lib/utils/common';
import { derived, type Writable } from 'svelte/store';

type Data = InferQueryOutput<'owner:charts:income'>;

export const incomeTableHeaders = [
	{ key: 'Date' },
	{ key: 'Status', style: 'bold1' },
	{ key: 'Amount' },
	{ key: 'Location' },
	{ key: 'Unit', style: 'bold2' },
	{ key: 'view', style: 'bold2' },
] as const;

export const getIncomeTableStore = (income: Writable<Data>) =>
	derived(income, ($income) => {
		const rows = $income.map((entry) => ({
			id: entry.id,
			view: `/transactions/${entry.id}`,
			Date: toUTCFormat(entry.postAt),
			Status: entry.isPaid ? 'Paid' : 'Unpaid',
			Amount: kwdFormat(entry.amount),
			Location: entry.propertyLabel,
			Unit: entry.unitLabel,
		}));
		const total = $income.reduce((acc, entry) => acc + entry.amount, 0);
		const table = new CTable({
			headers: incomeTableHeaders,
			rows,
			footer: {
				// percentage of paid
				Status: `${Math.round(
					($income.filter((entry) => entry.isPaid).length / $income.length) *
						100,
				)}%`,
				Amount: kwdFormat(total),
			},
		});
		return table;
	});
