import { stratify } from 'd3';

import { derived, writable } from 'svelte/store';

import type { GroupByCategoryDto, ExpenseCategoryDto } from '$api/openapi';

import { locale } from '$i18n/i18n-svelte';
import { ROOT_NODE } from '$lib/utils/expense-type-options';

export const categoriesRaw = writable<ExpenseCategoryDto[]>(); // TODO: make global

/** The categories with the label according to the locale.
 * Also includes an `Uncategorized` item. */
export const categories = derived(
	[categoriesRaw, locale],
	([$categories, locale]) => {
		const UNCATEGORIZED = {
			id: 'Uncategorized',
			labelEn: 'Uncategorized',
			labelAr: 'غير مصنف',
			parentId: null,
			isGroup: false,
		} satisfies ExpenseCategoryDto;

		const withUncategorized = [...$categories, UNCATEGORIZED];

		return withUncategorized.map((c) => {
			if (locale === 'ar' && c.labelAr) {
				return { ...c, label: c.labelAr };
			} else {
				return { ...c, label: c.labelEn };
			}
		}) satisfies ExpenseCategoryLocalized[];
	},
);

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
