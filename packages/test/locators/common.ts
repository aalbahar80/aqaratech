import { SidebarModel } from '../tests/components/sidebar/sidebar-model';

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

/** Login button */
export const getLoginButton = async (page: Page, isMobile: boolean) => {
	const loginButton = page.getByRole('link', { name: 'Log in' });
	if (isMobile) {
		// open sidebar
		const sidebar = new SidebarModel(page);
		await sidebar.open();
		return loginButton;
	} else {
		return loginButton;
	}
};

/** Locale switcher */
export const getLocaleSwitcher = async (
	page: Page,
	isMobile: boolean,
	name = 'العربية',
) => {
	const localeSwitcher = page.getByRole('link', { name });
	if (isMobile) {
		// open sidebar
		const sidebar = new SidebarModel(page);
		await sidebar.open();
		return localeSwitcher;
	} else {
		return localeSwitcher;
	}
};
