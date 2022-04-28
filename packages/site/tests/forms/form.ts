import type { TrpcClient } from '$lib/client/trpc';
import type { Page } from '@playwright/test';
import {
	fakeClient,
	fakeLease,
	fakeProperty,
	fakeTenant,
	fakeUnit,
} from '../../../seed/generators.js';
import {
	dateToInput,
	getAddress,
	getName,
} from '../../src/lib/utils/common.js';
import type { Entity } from '../../src/lib/models/interfaces/entity.interface.js';

export class Form {
	createUrl: string;
	editUrl: string;
	constructor(public page: Page, public urlName: Entity, public id: string) {
		this.editUrl = `${this.urlName}/${this.id}/edit`;
		this.createUrl = `/new/${this.urlName}`;
	}

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

	getUrl(type: 'new' | 'edit') {
		if (type === 'new') {
			return this.createUrl;
		} else if (type === 'edit') {
			return this.editUrl;
		} else {
			throw new Error('invalid type');
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setupNew() {}
}

export class ClientForm extends Form {
	static urlName: Entity = 'clients';
	constructor(page: Page, public data = fakeClient()) {
		super(page, ClientForm.urlName, data.id);
	}

	public async fill() {
		await this.page.fill('input[name="firstName"]', this.data.firstName);
		await this.page.fill('input[name="lastName"]', this.data.lastName);
		await this.page.fill('input[name="email"]', this.data.email);
		await this.page.fill('input[name="phone"]', this.data.phone);
		await this.page.fill('input[name="civilid"]', this.data.civilid);
		await this.page.fill('input[name="dob"]', dateToInput(this.data.dob));
	}

	// TODO: move to ancestor class
	public alter() {
		this.data = {
			...fakeClient(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.firstName, this.data.email];
	}

	async setup(trpcClient: TrpcClient) {
		await trpcClient.mutation('clients:create', this.data);
	}

	async clean(trpcClient: TrpcClient) {
		await trpcClient.mutation('clients:delete', this.id);
	}

	static async cleanById(trpcClient: TrpcClient, id: string) {
		await trpcClient.mutation(`${this.urlName}:delete`, id);
	}
}

export class PropertyForm extends Form {
	static urlName: Entity = 'properties';
	client: ReturnType<typeof fakeClient>;
	constructor(page: Page, public data = fakeProperty()) {
		super(page, PropertyForm.urlName, data.id);
		this.client = { ...fakeClient(), id: data.clientId };
	}

	public async fill() {
		await this.page.fill('[id="area"]', this.data.area);
		await this.page.locator(`.item >> text=${this.data.area}`).first().click();
		await this.page.keyboard.press('Enter');
		await this.page.fill('input[name="block"]', this.data.block);
		await this.page.fill('input[name="street"]', this.data.street);
		await this.page.fill('input[name="avenue"]', this.data.avenue ?? '');
		await this.page.fill('input[name="number"]', this.data.number);
		await this.page.waitForLoadState('networkidle');
		await this.page.selectOption('#clientId', { label: getName(this.client) });
	}

	public alter() {
		this.data = {
			...fakeProperty(),
			id: this.data.id,
		};
	}

	/**
	 * Basic fields to check existence of after form submittal
	 */
	public basic() {
		return [this.data.area];
	}

	override async setupNew(trpcClient: TrpcClient) {
		await trpcClient.mutation('clients:create', this.client);
	}

	async setup(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('clients:create', this.client),
			await trpcClient.mutation('properties:create', this.data),
		]);
	}

	async clean(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('properties:delete', this.data.id),
			await trpcClient.mutation('clients:delete', this.client.id),
		]);
	}

	static async cleanById(trpcClient: TrpcClient, id: string) {
		await trpcClient.mutation(`${this.urlName}:delete`, id);
	}
}

export class UnitForm extends Form {
	static urlName: Entity = 'units';
	client: ReturnType<typeof fakeClient>;
	property: ReturnType<typeof fakeProperty>;
	constructor(page: Page, public data = fakeUnit()) {
		super(page, UnitForm.urlName, data.id);
		this.property = { ...fakeProperty(), id: data.propertyId };
		this.client = { ...fakeClient(), id: this.property.clientId };
	}

	public async fill() {
		await this.page.fill('input[name="unitNumber"]', this.data.unitNumber);
		await this.page.fill('input[name="bed"]', this.data.bed.toString());
		await this.page.fill('input[name="bath"]', this.data.bath.toString());
		await this.page.fill('input[name="floor"]', this.data.floor.toString());
		await this.page.selectOption('#clientId', { label: getName(this.client) });
		await this.page.selectOption('#propertyId', {
			label: getAddress(this.property),
		});
	}

	public alter() {
		this.data = {
			...fakeUnit(),
			id: this.data.id,
		};
	}

	/**
	 * Basic fields to check existence of after form submittal
	 */
	public basic() {
		return [this.data.unitNumber];
	}

	override async setupNew(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('clients:create', this.client),
			await trpcClient.mutation('properties:create', this.property),
		]);
	}

	async setup(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('clients:create', this.client),
			await trpcClient.mutation('properties:create', this.property),
			await trpcClient.mutation('units:create', this.data),
		]);
	}

	async clean(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('units:delete', this.data.id),
			await trpcClient.mutation('properties:delete', this.property.id),
			await trpcClient.mutation('clients:delete', this.client.id),
		]);
	}

	static async cleanById(trpcClient: TrpcClient, id: string) {
		await trpcClient.mutation(`${this.urlName}:delete`, id);
	}
}

export class TenantForm extends Form {
	static urlName: Entity = 'tenants';
	constructor(page: Page, public data = fakeTenant()) {
		super(page, TenantForm.urlName, data.id);
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
			...fakeTenant(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.firstName, this.data.email];
	}

	async setup(trpcClient: TrpcClient) {
		await trpcClient.mutation('tenants:create', this.data);
	}

	async clean(trpcClient: TrpcClient) {
		await trpcClient.mutation('tenants:delete', this.id);
	}

	static async cleanById(trpcClient: TrpcClient, id: string) {
		await trpcClient.mutation(`${this.urlName}:delete`, id);
	}
}

export class LeaseForm extends Form {
	static urlName: Entity = 'leases';
	client: ReturnType<typeof fakeClient>;
	property: ReturnType<typeof fakeProperty>;
	unit: ReturnType<typeof fakeUnit>;
	tenant: ReturnType<typeof fakeTenant>;
	constructor(page: Page, public data = fakeLease()) {
		super(page, LeaseForm.urlName, data.id);
		this.unit = { ...fakeUnit(), id: data.unitId };
		this.property = { ...fakeProperty(), id: this.unit.propertyId };
		this.client = { ...fakeClient(), id: this.property.clientId };
		this.tenant = { ...fakeTenant(), id: data.tenantId };
	}

	public async fill() {
		await this.page.waitForLoadState('networkidle');
		await this.page.selectOption('#tenantId', { label: getName(this.tenant) });
		await this.page.selectOption('#propertyId', {
			label: getAddress(this.property),
		});
		await this.page.waitForLoadState('networkidle');
		await this.page.selectOption('#unitId', {
			label: [this.unit.type, this.unit.unitNumber]
				.filter((str) => str)
				.join(' '),
		});
		await this.page.fill(
			'input[name="monthlyRent"]',
			this.data.monthlyRent.toString(),
		);
	}

	public alter() {
		this.data = {
			...fakeLease(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.monthlyRent];
	}

	override async setupNew(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('clients:create', this.client),
			await trpcClient.mutation('properties:create', this.property),
			await trpcClient.mutation('units:create', this.unit),
			await trpcClient.mutation('tenants:create', this.tenant),
		]);
	}

	async setup(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('clients:create', this.client),
			await trpcClient.mutation('properties:create', this.property),
			await trpcClient.mutation('units:create', this.unit),
			await trpcClient.mutation('tenants:create', this.tenant),
			await trpcClient.mutation('leases:create', this.data),
		]);
	}

	async clean(trpcClient: TrpcClient) {
		await Promise.all([
			await trpcClient.mutation('leases:delete', this.data.id),
			await trpcClient.mutation('units:delete', this.unit.id),
			await trpcClient.mutation('properties:delete', this.property.id),
			await trpcClient.mutation('clients:delete', this.client.id),
			await trpcClient.mutation('tenants:delete', this.tenant.id),
		]);
	}

	static async cleanById(trpcClient: TrpcClient, id: string) {
		await trpcClient.mutation(`${this.urlName}:delete`, id);
	}
}
