import { derived, writable } from 'svelte/store';

import type { ExpenseCategoryDto } from '$api/openapi';

import { locale } from '$i18n/i18n-svelte';

export const categoriesRaw = writable<ExpenseCategoryDto[]>([]);

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

export type ExpenseCategoryLocalized = ExpenseCategoryDto & { label: string };
