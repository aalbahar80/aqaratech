import { derived, writable } from 'svelte/store';

import type { ExpenseCategoryDto } from '$api/openapi';

import { locale } from '$i18n/i18n-svelte';

export const categoriesRaw = writable<ExpenseCategoryDto[]>([]);

/** The categories with the label according to the locale. */
export const categories = derived(
	[categoriesRaw, locale],
	([$categories, locale]) => {
		return $categories.map((c) => {
			if (locale === 'ar' && c.labelAr) {
				return { ...c, label: c.labelAr };
			} else {
				return { ...c, label: c.labelEn };
			}
		}) satisfies ExpenseCategoryLocalized[];
	},
);

export type ExpenseCategoryLocalized = ExpenseCategoryDto & { label: string };
