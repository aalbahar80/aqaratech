import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export const preselected = async (
	page: Page,
	el: Locator,
	expected: string,
) => {
	await page.waitForLoadState('networkidle');
	const selected = await el.innerText();
	expect(selected).toMatch(expected);
};
