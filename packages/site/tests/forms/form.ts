import type { Page } from '@playwright/test';
import { fakeClient, fakeProperty } from '../../../seed/generators.js';
import { dateToInput, getName } from '../../src/lib/utils/common.js';

export class Form {
	constructor(public page: Page) {}

	submit() {
		return this.page.click('button[type="submit"]');
	}

	async getRequest() {
		const re = new RegExp('/trpc');
		const [request] = await Promise.all([
			this.page.waitForRequest(re),
			await this.submit(),
		]);
		return request;
	}
}

export class ClientForm extends Form {
	static createUrl = '/new/clients';
	static urlName2 = 'clients';
	createUrl = '/new/clients';
	urlName = 'clients';
	constructor(page: Page, public data = fakeClient()) {
		super(page);
	}

	public async fill() {
		await this.page.fill('input[name="firstName"]', this.data.firstName);
		await this.page.fill('input[name="lastName"]', this.data.lastName);
		await this.page.fill('input[name="email"]', this.data.email);
		await this.page.fill('input[name="phone"]', this.data.phone);
		await this.page.fill('input[name="civilid"]', this.data.civilid);
		await this.page.fill('input[name="dob"]', dateToInput(this.data.dob));
	}

	public alter() {
		this.data = {
			...fakeClient(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.firstName, this.data.email];
	}
}

export class PropertyForm extends Form {
	static createUrl = '/new/properties';
	static urlName2 = 'properties';
	createUrl = '/new/properties';
	urlName = 'properties';
	constructor(
		page: Page,
		public data = fakeProperty(),
		public client = fakeClient(),
	) {
		super(page);
	}

	public async fill() {
		await this.page.fill('[id="area"]', this.data.area);
		await this.page.locator(`.item >> text=${this.data.area}`).click();
		await this.page.keyboard.press('Enter');
		await this.page.fill('input[name="block"]', this.data.block);
		await this.page.fill('input[name="street"]', this.data.street);
		await this.page.fill('input[name="avenue"]', this.data.avenue ?? '');
		await this.page.fill('input[name="number"]', this.data.number);
		await this.page.selectOption('#clientId', { label: getName(this.client) });
	}

	public alter() {
		this.data = {
			...fakeProperty(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.area];
	}
}
