import { stratify } from 'd3';

import { derived, writable } from 'svelte/store';

import type { GroupByCategoryDto, ExpenseCategoryDto } from '$api/openapi';

import { categories } from '$lib/stores/expense-categories';
import { ROOT_NODE } from '$lib/utils/expense-type-options';

export const expensesByCategory = writable<GroupByCategoryDto[]>();

/** The expense tree as a d3 hierarchy node. */
export const expenseTreeCat = derived(
	[expensesByCategory, categories],
	([expenses, categories]) => {
		const root = stratify<ExpenseCategoryLocalized>()
			.id((d) => d.id.toString())
			.parentId((d) => {
				if (d.id === ROOT_NODE.id) return null;
				if (!d.parentId) return ROOT_NODE.id;
				return categories.find((c) => c.id === d.parentId)?.id.toString();
			})([ROOT_NODE, ...categories]);

		root.sum((d) => {
			// get sum of all expenses for this category
			const categorySummary = expenses.find((e) => e.categoryId === d.id);

			if (!categorySummary) {
				return 0;
			} else {
				return categorySummary.amount;
			}
		});

		root.sort((a, b) => {
			return (b.value ?? 0) - (a.value ?? 0);
		});

		return root;
	},
);

export type ExpenseCategoryLocalized = ExpenseCategoryDto & { label: string };
