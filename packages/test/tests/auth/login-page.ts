import { expect, type Page } from '@playwright/test';

import { getLoginButton } from '../../locators/common';
import { siteURL } from '../api/fixtures/site-url';

export class LoginPage {
	readonly page: Page;
	readonly isMobile: boolean;

	constructor(page: Page, isMobile: boolean) {
		this.page = page;
		this.isMobile = isMobile;
	}

	async goto() {
		await this.page.goto(siteURL);

		const loginButton = await getLoginButton(this.page, this.isMobile);
		await loginButton.click();
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
