import { writable } from 'svelte/store';

/** Used in nav-tree to render income/expense links. */
export type FallBackPortfolioId = string;

export const fallbackPortfolioId = writable<FallBackPortfolioId | undefined>(
	undefined,
);
