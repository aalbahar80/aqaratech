import { expect, type Page } from '@playwright/test';

import { siteURL } from '../api/fixtures/site-url';

export class LoginPage {
	readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	async goto() {
		await this.page.goto(siteURL);

		await this.page
			.getByRole('banner', { name: 'Global' })
			.getByRole('link', { name: 'Log in' })
			.click();
	}

	async fill({ email, password }: { email: string; password: string }) {
		const emailInput = this.page.getByLabel('Email address');
		await expect(emailInput, {
			message:
				'Auth0 login page might not have loaded. This might be caused by rate limiting.',
		}).toBeVisible();
		await emailInput.fill(email);
		await this.page.getByLabel('Password').fill(password);
		await this.page.getByRole('button', { name: 'Continue' }).click();

		// wait to be redirected to our domain
		await expect(this.page).toHaveURL(new RegExp(`^${siteURL}`));
	}
}
