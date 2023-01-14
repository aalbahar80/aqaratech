import type { Page } from '@playwright/test';

/** Top horizontal navbar */
export const navbar = (page: Page) =>
	page.getByRole('banner', { name: 'Global' });
