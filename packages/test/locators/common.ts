import type { Page } from '@playwright/test';

/** Top horizontal navbar */
export const navbar = (page: Page) =>
	page.getByRole('banner', { name: 'Global' });

/** Vertical sidebar */
export const sidebar = (page: Page) => page.locator('aside');

/** Text elements in a chart card */
export const chartText = (page: Page) => [
	page.getByTestId('chart-card').getByRole('heading'),
	page.getByTestId('chart-card').getByRole('paragraph'),
];
