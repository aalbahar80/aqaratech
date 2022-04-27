import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const preselected = async (
	page: Page,
	el: Locator,
	expected: string,
) => {
	await page.waitForLoadState('networkidle');
	const selected = await el.evaluate(
		(el: HTMLSelectElement) => el.selectedOptions[0].textContent,
	);
	expect(selected).toMatch(expected);
};
