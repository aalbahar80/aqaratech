import type { Locator } from '@playwright/test';

export const selectedLabel = async (loc: Locator) =>
	await loc.evaluate(
		(e: HTMLSelectElement) => e.options[e.selectedIndex]?.innerText,
	);
