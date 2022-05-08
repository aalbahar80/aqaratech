import type { Page } from '@playwright/test';
import {
	fakeClient,
	fakeExpense,
	fakeLease,
	fakeMaintenanceOrder,
	fakeProperty,
	fakeTenant,
	fakeUnit,
} from '../../../seed/generators.js';
import type { Entity } from '../../src/lib/models/types/entity.type.js';
import {
	dateToInput,
	getAddress,
	getName,
	getUnitLabel,
	kwdFormat,
} from '../../src/lib/utils/common.js';
import prisma from '../prismaClient.js';

export type FormType =
	| ClientForm
	| PropertyForm
	| UnitForm
	| TenantForm
	| LeaseForm
	| ExpenseForm
	| MaintenanceOrderForm;

class Basket {
	constructor(
		public clients: string[] = [],
		public properties: string[] = [],
		public units: string[] = [],
		public tenants: string[] = [],
		public leases: string[] = [],
		public expenses: string[] = [],
		public maintenanceOrders: string[] = [],
	) {}

	async clean() {}
}

export class Form {
	createUrl: string;
	editUrl: string;
	public basket = new Basket();

	constructor(public urlName: Entity, public id: string) {
		// super(urlName);
		this.editUrl = `/${this.urlName}/${this.id}/edit`;
		this.createUrl = `/new/${this.urlName}`;
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

	async clean() {
		await this.basket.clean();
	}
}

export class ClientForm extends Form {
	static urlName: Entity = 'clients';
	constructor(public data = fakeClient()) {
		super(ClientForm.urlName, data.id);
	}

	public async fill(page: Page) {
		await page.fill('input[name="firstName"]', this.data.firstName);
		await page.fill('input[name="lastName"]', this.data.lastName);
		await page.fill('input[name="email"]', this.data.email);
		await page.fill('input[name="phone"]', this.data.phone);
		await page.fill('input[name="civilid"]', this.data.civilid);
		await page.fill('input[name="dob"]', dateToInput(this.data.dob));
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

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async setupNew() {}

	async setupEdit() {
		const { id } = await prisma.client.create({ data: this.data });
		this.basket.clients.push(id);
	}
}

export class PropertyForm extends Form {
	static urlName: Entity = 'properties';
	client: ReturnType<typeof fakeClient>;
	constructor(public data = fakeProperty()) {
		super(PropertyForm.urlName, data.id);
		this.client = { ...fakeClient(), id: data.clientId };
	}

	public async fill(page: Page) {
		await page.selectOption('#clientId', { label: getName(this.client) });
		await page.fill('[id="area"]', this.data.area);
		await page.locator(`.item >> text=${this.data.area}`).first().click();
		await page.keyboard.press('Enter');
		await page.fill('input[name="block"]', this.data.block);
		await page.fill('input[name="street"]', this.data.street);
		await page.fill('input[name="avenue"]', this.data.avenue ?? '');
		await page.fill('input[name="number"]', this.data.number);
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

	async setupNew() {
		const [client] = await Promise.all([
			prisma.client.create({ data: this.client }),
		]);
		this.basket.clients.push(client.id);
	}

	async setupEdit() {
		const [client, property] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.data }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
	}
}

export class UnitForm extends Form {
	static urlName: Entity = 'units';
	client: ReturnType<typeof fakeClient>;
	property: ReturnType<typeof fakeProperty>;
	constructor(public data = fakeUnit()) {
		super(UnitForm.urlName, data.id);
		this.property = { ...fakeProperty(), id: data.propertyId };
		this.client = { ...fakeClient(), id: this.property.clientId };
	}

	public async fill(page: Page) {
		await page.selectOption('#clientId', { label: getName(this.client) });
		await page.selectOption('#propertyId', {
			label: getAddress(this.property),
		});
		await page.fill('input[name="unitNumber"]', this.data.unitNumber);
		await page.fill('input[name="bed"]', this.data.bed.toString());
		await page.fill('input[name="bath"]', this.data.bath.toString());
		await page.fill('input[name="floor"]', this.data.floor.toString());
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

	async setupNew() {
		const [client, property] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
	}

	async setupEdit() {
		const [client, property, unit] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.data }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
		this.basket.units.push(unit.id);
	}
}

export class TenantForm extends Form {
	static urlName: Entity = 'tenants';
	constructor(public data = fakeTenant()) {
		super(TenantForm.urlName, data.id);
	}

	public async fill(page: Page) {
		await page.fill('input[name="firstName"]', this.data.firstName);
		await page.fill('input[name="lastName"]', this.data.lastName);
		await page.fill('input[name="email"]', this.data.email);
		await page.fill('input[name="phone"]', this.data.phone);
		await page.fill('input[name="civilid"]', this.data.civilid);
		await page.fill('input[name="dob"]', dateToInput(this.data.dob));
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

	async setupEdit() {
		const { id } = await prisma.tenant.create({ data: this.data });
		this.basket.tenants.push(id);
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async setupNew() {}
}

export class LeaseForm extends Form {
	static urlName: Entity = 'leases';
	client: ReturnType<typeof fakeClient>;
	property: ReturnType<typeof fakeProperty>;
	unit: ReturnType<typeof fakeUnit>;
	tenant: ReturnType<typeof fakeTenant>;
	constructor(public data = fakeLease()) {
		super(LeaseForm.urlName, data.id);
		this.unit = { ...fakeUnit(), id: data.unitId };
		this.property = { ...fakeProperty(), id: this.unit.propertyId };
		this.client = { ...fakeClient(), id: this.property.clientId };
		this.tenant = { ...fakeTenant(), id: data.tenantId };
	}

	public async fill(page: Page) {
		await page.selectOption('#tenantId', { label: getName(this.tenant) });
		await page.selectOption('#clientId', {
			label: getName(this.client),
		});
		await page.selectOption('#propertyId', {
			label: getAddress(this.property),
		});
		await page.selectOption('#unitId', {
			label: getUnitLabel(this.unit),
		});
		await page.fill(
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
		return [kwdFormat(this.data.monthlyRent)];
	}

	async setupNew() {
		const [client, property, unit, tenant] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.tenant.create({ data: this.tenant }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
		this.basket.units.push(unit.id);
		this.basket.tenants.push(tenant.id);
	}

	async setupEdit() {
		const [client, property, unit, tenant, lease] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.tenant.create({ data: this.tenant }),
			prisma.lease.create({ data: this.data }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
		this.basket.units.push(unit.id);
		this.basket.tenants.push(tenant.id);
		this.basket.leases.push(lease.id);
	}
}

export class ExpenseForm extends Form {
	static urlName: Entity = 'expenses';
	constructor(
		public client = fakeClient(),
		public property = fakeProperty(client.id),
		public unit = fakeUnit(property.id),
		public data = {
			...fakeExpense(),
			clientId: null,
			propertyId: property.id,
			unitId: null,
		},
	) {
		super(ExpenseForm.urlName, data.id);
	}

	public async fill(page: Page) {
		await page.fill('input[name="amount"]', this.data.amount.toString());
		await page.fill('input[name="postAt"]', dateToInput(this.data.postAt));
		await page.fill('input[name="memo"]', this.data.memo);
		await page.selectOption('#category', { value: this.data.category });
		await page.selectOption('#clientId', { index: 0 });
		await page.selectOption('#propertyId', { index: 0 });
		await page.selectOption('#unitId', { index: 0 });
		await page.locator('#clientId-radio').click();
	}

	public alter() {
		this.data = {
			...fakeExpense(),
			clientId: null,
			propertyId: this.property.id,
			unitId: null,
			id: this.data.id,
		};
	}

	public basic() {
		return [
			kwdFormat(this.data.amount),
			this.data.category,
			// this.data.postAt,
			this.data.memo,
		];
	}

	async setupNew() {
		const [client, property, unit] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
		this.basket.units.push(unit.id);
	}

	async setupEdit() {
		const [client, property, unit, expense] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.expense.create({ data: this.data }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
		this.basket.units.push(unit.id);
		this.basket.expenses.push(expense.id);
	}
}

export class MaintenanceOrderForm extends Form {
	static urlName: Entity = 'maintenanceOrders';
	constructor(
		public client = fakeClient(),
		public property = fakeProperty(client.id),
		public unit = fakeUnit(property.id),
		public data = {
			...fakeMaintenanceOrder(),
			clientId: null,
			propertyId: property.id,
			unitId: null,
		},
	) {
		super(MaintenanceOrderForm.urlName, data.id);
	}

	public async fill(page: Page) {
		await page.fill(
			'input[name="completedAt"]',
			dateToInput(this.data.completedAt),
		);
		await page.fill('input[name="title"]', this.data.title);
		await page.fill('input[name="description"]', this.data.description);
		await page.selectOption('#status', { index: 0 });
		await page.selectOption('#clientId', { index: 0 });
		await page.selectOption('#propertyId', { index: 0 });
		await page.selectOption('#unitId', { index: 0 });
		await page.locator('#clientId-radio').click();
	}

	public alter() {
		this.data = {
			...fakeMaintenanceOrder(),
			clientId: null,
			propertyId: this.property.id,
			unitId: null,
			id: this.data.id,
		};
	}

	public basic() {
		return [
			this.data.title,
			// this.data.status,
			this.data.description,
		];
	}

	async setupNew() {
		const [client, property, unit] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
		this.basket.units.push(unit.id);
	}

	async setupEdit() {
		const [client, property, unit, expense] = await Promise.all([
			prisma.client.create({ data: this.client }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.maintenanceOrder.create({ data: this.data }),
		]);
		this.basket.clients.push(client.id);
		this.basket.properties.push(property.id);
		this.basket.units.push(unit.id);
		this.basket.maintenanceOrders.push(expense.id);
	}
}

export const formClasses = {
	clients: ClientForm,
	properties: PropertyForm,
	units: UnitForm,
	leases: LeaseForm,
	tenants: TenantForm,
	expenses: ExpenseForm,
	maintenanceOrders: MaintenanceOrderForm,
} as const;
