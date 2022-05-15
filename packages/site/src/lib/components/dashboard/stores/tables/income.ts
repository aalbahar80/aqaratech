import type { InferQueryOutput } from '$lib/client/trpc';
import { Property } from '$lib/models/classes/property.class';
import { dateFormat, kwdFormat } from '$lib/utils/common';
import { derived, type Writable } from 'svelte/store';
import { CTable } from '$lib/models/classes/table.class';
import { sort } from '$lib/components/dashboard/stores/charts/income';
import { Unit } from '$lib/models/classes/unit.class';

type Data = InferQueryOutput<'owner:charts:income'>;

export const incomeTableHeaders = [
	{ key: 'Date' as const },
	{
		key: 'Status' as const,
		style: 'bold1' as const,
	},
	{ key: 'Amount' as const },
	{ key: 'Location' as const },
	{ key: 'Unit' as const, style: 'bold2' as const },
];

export const getIncomeTableStore = (income: Writable<Data>) =>
	derived(income, ($income) => {
		const normalized = sort($income);

		const rows = normalized.map((entry) => ({
			id: entry.id,
			Date: dateFormat(entry.postAt),
			Status: entry.isPaid ? 'Paid' : 'Unpaid',
			Amount: kwdFormat(entry.amount),
			Location: Property.getLabel(entry.property),
			Unit: Unit.getLabel(entry.unit),
		}));
		const total = normalized.reduce((acc, entry) => acc + entry.amount, 0);
		const table = new CTable({
			headers: incomeTableHeaders,
			rows,
			footer: {
				// percentage of paid
				Status: `${Math.round(
					(normalized.filter((entry) => entry.isPaid).length /
						normalized.length) *
						100,
				)}%`,
				Amount: kwdFormat(total),
			},
		});
		return table;
	});
