import type { Page } from '@playwright/test';
import {
	fakePortfolio,
	fakeExpense,
	fakeLease,
	fakeMaintenanceOrder,
	fakeProperty,
	fakeTenant,
	fakeUnit,
} from '@self/seed';
import {
	Portfolio,
	Expense,
	Lease,
	MaintenanceOrder,
	Property,
	Tenant,
	Unit,
} from '../../package/index.js';
import type { EntityTitle } from '../../package/models/types/entity.type';
import {
	dateToInput,
	getAddress,
	getUnitLabel,
	kwdFormat,
} from '../../package/utils/common.js';
import prisma from '../../src/lib/server/prismaClient.js';

export type FormType =
	| PortfolioForm
	| PropertyForm
	| UnitForm
	| TenantForm
	| LeaseForm
	| ExpenseForm
	| MaintenanceOrderForm;

type Attribution = 'portfolio' | 'property' | 'unit';
export const getRelations = (
	data: {
		portfolio: { id: string };
		property: { id: string };
		unit: { id: string };
	},
	attribution?: Attribution,
) =>
	attribution
		? {
				portfolioId: attribution === 'portfolio' ? data.portfolio.id : null,
				propertyId: attribution === 'property' ? data.property.id : null,
				unitId: attribution === 'unit' ? data.unit.id : null,
		  }
		: {};

export class Form {
	createUrl: string;
	editUrl: string;
	relationalFields: readonly string[] = [];

	constructor(public urlName: EntityTitle, public id: string) {
		// super(urlName);
		this.editUrl = `/${this.urlName}/${this.id}/edit`;
		this.createUrl = `/${this.urlName}/new`;
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

	async clean() {}
}

export class PortfolioForm extends Form {
	static urlName: EntityTitle = 'portfolios';
	constructor(public data = fakePortfolio()) {
		super(PortfolioForm.urlName, data.id);
	}
	override relationalFields = Unit.relationalFields;

	public get ins(): Portfolio {
		return new Portfolio({ ...this.data });
	}

	public async fill(page: Page) {
		await page.fill('input[name="fullName"]', this.data.fullName);
		// await page.fill('input[name="label"]', this.data.label);
		await page.fill('input[name="email"]', this.data.email);
		await page.fill('input[name="phone"]', this.data.phone);
		await page.fill('input[name="civilid"]', this.data.civilid);
		await page.fill('input[name="dob"]', dateToInput(this.data.dob));
	}

	// TODO: move to ancestor class
	public alter() {
		this.data = {
			...fakePortfolio(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.fullName, this.data.email];
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async setupNew() {}

	async setupEdit() {
		await prisma.portfolio.create({ data: this.data });
	}
}

export class PropertyForm extends Form {
	static urlName: EntityTitle = 'properties';
	override relationalFields = Property.relationalFields;

	portfolio: ReturnType<typeof fakePortfolio>;
	constructor(public data = fakeProperty()) {
		super(PropertyForm.urlName, data.id);
		this.portfolio = { ...fakePortfolio(), id: data.portfolioId };
	}

	public get ins(): Property {
		return new Property({ ...this.data, portfolio: this.portfolio });
	}

	public async fill(page: Page) {
		await page.selectOption('#portfolioId', { label: this.portfolio.fullName });
		await page.fill('[id="area"]', this.data.area);
		await page.locator(`.item >> text=${this.data.area}`).first().click();
		await page.keyboard.press('Enter');
		await page.fill('input[name="block"]', this.data.block);
		await page.fill('input[name="street"]', this.data.street);
		await page.fill('input[name="avenue"]', this.data.avenue ?? '');
		await page.fill('input[name="number"]', this.data.number);
		await page.fill('input[name="parcel"]', this.data.parcel);
		await page.fill('input[name="paci"]', this.data.paci);
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
		await Promise.all([prisma.portfolio.create({ data: this.portfolio })]);
	}

	async setupEdit() {
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.data }),
		]);
	}
}

export class UnitForm extends Form {
	static urlName: EntityTitle = 'units';
	portfolio: ReturnType<typeof fakePortfolio>;
	property: ReturnType<typeof fakeProperty>;
	constructor(public data = fakeUnit()) {
		super(UnitForm.urlName, data.id);
		this.property = { ...fakeProperty(), id: data.propertyId };
		this.portfolio = { ...fakePortfolio(), id: this.property.portfolioId };
	}

	public async fill(page: Page) {
		await page.selectOption('#portfolioId', { label: this.portfolio.fullName });
		await page.selectOption('#propertyId', {
			label: getAddress(this.property),
		});
		await page.fill('input[name="unitNumber"]', this.data.unitNumber);
		await page.fill('input[name="bed"]', this.data.bed.toString());
		await page.fill('input[name="bath"]', this.data.bath.toString());
		await page.fill('input[name="floor"]', this.data.floor.toString());
	}

	public get ins(): Unit {
		return new Unit({
			...this.data,
			property: { ...this.property, portfolio: { ...this.portfolio } },
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

	async setupNew() {
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
		]);
	}

	async setupEdit() {
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.data }),
		]);
	}
}

export class TenantForm extends Form {
	static urlName: EntityTitle = 'tenants';
	constructor(public data = fakeTenant()) {
		super(TenantForm.urlName, data.id);
	}

	public async fill(page: Page) {
		await page.fill('input[name="fullName"]', this.data.fullName);
		// await page.fill('input[name="label"]', this.data.label);
		await page.fill('input[name="email"]', this.data.email);
		await page.fill('input[name="phone"]', this.data.phone);
		await page.fill('input[name="civilid"]', this.data.civilid);
		await page.fill('input[name="dob"]', dateToInput(this.data.dob));
	}

	public get ins(): Tenant {
		return new Tenant({ ...this.data });
	}

	public alter() {
		this.data = {
			...fakeTenant(),
			id: this.data.id,
		};
	}

	public basic() {
		return [this.data.fullName, this.data.email];
	}

	async setupEdit() {
		await prisma.tenant.create({ data: this.data });
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	async setupNew() {}
}

export class LeaseForm extends Form {
	static urlName: EntityTitle = 'leases';
	override relationalFields = Lease.relationalFields;
	portfolio: ReturnType<typeof fakePortfolio>;
	property: ReturnType<typeof fakeProperty>;
	unit: ReturnType<typeof fakeUnit>;
	tenant: ReturnType<typeof fakeTenant>;
	constructor(public data = fakeLease()) {
		super(LeaseForm.urlName, data.id);
		this.unit = { ...fakeUnit(), id: data.unitId };
		this.property = { ...fakeProperty(), id: this.unit.propertyId };
		this.portfolio = { ...fakePortfolio(), id: this.property.portfolioId };
		this.tenant = { ...fakeTenant(), id: data.tenantId };
	}

	public get ins(): Lease {
		return new Lease({
			...this.data,
			unit: {
				...this.unit,
				property: { ...this.property, portfolio: { ...this.portfolio } },
			},
			tenant: { ...this.tenant },
		});
	}

	public async fill(page: Page) {
		await page.fill('[id="tenantId"]', this.tenant.fullName);
		await page
			.locator(`.sv-item >> text=${this.tenant.fullName}`)
			.first()
			.click();
		await page.selectOption('#portfolioId', {
			label: this.portfolio.fullName,
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
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.tenant.create({ data: this.tenant }),
		]);
	}

	async setupEdit() {
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.tenant.create({ data: this.tenant }),
			prisma.lease.create({ data: this.data }),
		]);
	}
}

export class ExpenseForm extends Form {
	static urlName: EntityTitle = 'expenses';
	override relationalFields = Expense.relationalFields;
	constructor(
		public portfolio = fakePortfolio(),
		public property = fakeProperty(portfolio.id),
		public unit = fakeUnit(property.id),
		public data = {
			...fakeExpense(),
			portfolioId: null,
			propertyId: property.id,
			unitId: null,
		},
	) {
		super(ExpenseForm.urlName, data.id);
	}

	public get ins(): Expense {
		return new Expense({
			...this.data,
			portfolio: { ...this.portfolio },
			property: {
				...this.property,
				portfolio: { ...this.portfolio },
			},
			unit: {
				...this.unit,
				property: { ...this.property, portfolio: { ...this.portfolio } },
			},
		});
	}

	public async fill(page: Page) {
		await page.fill('input[name="amount"]', this.data.amount.toString());
		await page.fill('input[name="postAt"]', dateToInput(this.data.postAt));
		await page.fill('input[name="memo"]', this.data.memo);
		await page.selectOption('#categoryId', {
			label: 'Management Fees - رسوم إدارية',
		});
		await page.selectOption('#portfolioId', { index: 0 });
		await page.selectOption('#propertyId', { index: 0 });
		await page.selectOption('#unitId', { index: 0 });
		await page.locator('#propertyId-radio').click();
	}

	public alter() {
		this.data = {
			...fakeExpense(),
			portfolioId: null,
			propertyId: this.property.id,
			unitId: null,
			id: this.data.id,
		};
	}

	public basic() {
		return [
			kwdFormat(this.data.amount),
			'Management Fees - رسوم إدارية',
			// this.data.postAt,
			this.data.memo,
		];
	}

	async setupNew() {
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
		]);
	}

	async setupEdit(attribution?: Attribution) {
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.expense.create({
				data: { ...this.data, ...getRelations(this, attribution) },
			}),
		]);
	}
}

export class MaintenanceOrderForm extends Form {
	static urlName: EntityTitle = 'maintenanceOrders';
	override relationalFields = MaintenanceOrder.relationalFields;
	constructor(
		public portfolio = fakePortfolio(),
		public property = fakeProperty(portfolio.id),
		public unit = fakeUnit(property.id),
		public data = {
			...fakeMaintenanceOrder(),
			portfolioId: null,
			propertyId: property.id,
			unitId: null,
		},
	) {
		super(MaintenanceOrderForm.urlName, data.id);
	}

	public get ins(): MaintenanceOrder {
		return new MaintenanceOrder({
			...this.data,
			portfolio: { ...this.portfolio },
			property: {
				...this.property,
				portfolio: { ...this.portfolio },
			},
			unit: {
				...this.unit,
				property: { ...this.property, portfolio: { ...this.portfolio } },
			},
		});
	}

	public async fill(page: Page) {
		await page.fill(
			'input[name="completedAt"]',
			dateToInput(this.data.completedAt),
		);
		await page.fill('input[name="title"]', this.data.title);
		await page.fill('input[name="description"]', this.data.description);
		await page.selectOption('#status', { index: 0 });
		await page.selectOption('#portfolioId', { index: 0 });
		await page.selectOption('#propertyId', { index: 0 });
		await page.selectOption('#unitId', { index: 0 });
		await page.locator('#unitId-radio').click();
	}

	public alter() {
		this.data = {
			...fakeMaintenanceOrder(),
			portfolioId: null,
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
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
		]);
	}

	async setupEdit(attribution?: Attribution) {
		await Promise.all([
			prisma.portfolio.create({ data: this.portfolio }),
			prisma.property.create({ data: this.property }),
			prisma.unit.create({ data: this.unit }),
			prisma.maintenanceOrder.create({
				data: { ...this.data, ...getRelations(this, attribution) },
			}),
		]);
	}
}

export const formClasses = {
	portfolios: PortfolioForm,
	properties: PropertyForm,
	units: UnitForm,
	leases: LeaseForm,
	tenants: TenantForm,
	expenses: ExpenseForm,
	maintenanceOrders: MaintenanceOrderForm,
} as const;
