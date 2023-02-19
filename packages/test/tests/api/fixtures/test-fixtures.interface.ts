import type {
	ExpenseCategoryFactoryParams,
	ExpenseFactoryParams,
	LeaseFactoryParams,
	LeaseInvoiceFactoryParams,
	MaintenanceOrderFactoryParams,
	PayoutFactoryParams,
	PortfolioFactoryParams,
	PropertyFactoryParams,
	RoleFactoryParams,
	TenantFactoryParams,
	UnitFactoryParams,
} from '@self/seed';

import type {
	ExpenseCategoryDto,
	OrganizationCreatedDto,
	PayoutDto,
} from '../../../types/api';
import type {
	BrowserContext,
	Fixtures,
	PlaywrightTestArgs,
	PlaywrightWorkerArgs,
} from '@playwright/test';
import type {
	Expense,
	Lease,
	LeaseInvoice,
	MaintenanceOrder,
	Portfolio,
	Property,
	Role,
	Tenant,
	Unit,
} from '@prisma/client';

export interface TestFixtures {
	// auth
	scopedContext: PlaywrightTestArgs['context'];
	scopedRequest: PlaywrightTestArgs['request'];
	scopedPage: PlaywrightTestArgs['page'];
	roleCookie: Parameters<BrowserContext['addCookies']>[0][0] | null;

	org: OrganizationCreatedDto;
	role: Role;
	roles: [Role, ...Role[]];
	tenant: Tenant;
	tenants: [Tenant, ...Tenant[]];
	portfolio: Portfolio;
	portfolios: [Portfolio, ...Portfolio[]];
	property: Property;
	properties: [Property, ...Property[]];
	unit: Unit;
	units: [Unit, ...Unit[]];
	lease: Lease;
	leases: [Lease, ...Lease[]];
	invoice: LeaseInvoice;
	invoices: [LeaseInvoice, ...LeaseInvoice[]];
	expense: Expense;
	expenses: [Expense, ...Expense[]];
	payout: PayoutDto;
	payouts: [PayoutDto, ...PayoutDto[]];
	maintenanceOrder: MaintenanceOrder;
	maintenanceOrders: [MaintenanceOrder, ...MaintenanceOrder[]];
	expenseCategory: ExpenseCategoryDto;
	file: string;
}

export interface TestOptions {
	// auth
	userRoleType: Role['roleType'];
	rolesParams: RoleFactoryParams[] | undefined;

	tenantsParams: TenantFactoryParams[] | undefined;
	portfoliosParams: PortfolioFactoryParams[] | undefined;
	propertiesParams: PropertyFactoryParams[] | undefined;
	unitsParams: UnitFactoryParams[] | undefined;
	leasesParams: LeaseFactoryParams[] | undefined;
	payoutsParams: PayoutFactoryParams[] | undefined;
	invoicesParams: LeaseInvoiceFactoryParams[] | undefined;
	/**
	 * Both propertyId and unitId are defined by default. If you want to override,
	 * explicitly set the value to null.
	 */
	expensesParams: ExpenseFactoryParams[] | undefined;
	expenseCategoryParams: ExpenseCategoryFactoryParams | undefined;
	maintenanceOrdersParams: MaintenanceOrderFactoryParams[] | undefined;

	/** Whether to create an organization storage bucket for the project. */
	createBucket: boolean;

	/** Wait for body.started selector. Some tests are flakey without this check. */
	waitForHydration: boolean;
}

export type AllFixtures = Fixtures<
	TestFixtures & TestOptions,
	// eslint-disable-next-line @typescript-eslint/ban-types
	{},
	PlaywrightTestArgs,
	PlaywrightWorkerArgs
>;

// `AllFixtures` type taken from TestType.extend.params[0]
// extend<T extends KeyValue, W extends KeyValue = {}>(fixtures: Fixtures<T, W, TestArgs, WorkerArgs>): TestType<TestArgs & T, WorkerArgs & W>;
