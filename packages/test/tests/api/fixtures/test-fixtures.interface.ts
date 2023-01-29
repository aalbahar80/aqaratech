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
	ExpenseDto,
	LeaseDto,
	LeaseInvoiceDto,
	MaintenanceOrderDto,
	OrganizationCreatedDto,
	PayoutDto,
	PortfolioDto,
	PropertyDto,
	RoleDto,
	TenantDto,
	UnitDto,
} from '../../../types/api';
import type {
	BrowserContext,
	Fixtures,
	PlaywrightTestArgs,
	PlaywrightWorkerArgs,
} from '@playwright/test';

export interface TestFixtures {
	// auth
	scopedContext: PlaywrightTestArgs['context'];
	scopedRequest: PlaywrightTestArgs['request'];
	scopedPage: PlaywrightTestArgs['page'];
	roleCookie: Parameters<BrowserContext['addCookies']>[0][0];

	org: OrganizationCreatedDto;
	role: RoleDto;
	roles: [RoleDto, ...RoleDto[]];
	tenant: TenantDto;
	tenants: [TenantDto, ...TenantDto[]];
	portfolio: PortfolioDto;
	portfolios: [PortfolioDto, ...PortfolioDto[]];
	property: PropertyDto;
	properties: [PropertyDto, ...PropertyDto[]];
	unit: UnitDto;
	units: [UnitDto, ...UnitDto[]];
	lease: LeaseDto;
	leases: [LeaseDto, ...LeaseDto[]];
	invoice: LeaseInvoiceDto;
	invoices: [LeaseInvoiceDto, ...LeaseInvoiceDto[]];
	expense: ExpenseDto;
	expenses: [ExpenseDto, ...ExpenseDto[]];
	payout: PayoutDto;
	payouts: [PayoutDto, ...PayoutDto[]];
	maintenanceOrder: MaintenanceOrderDto;
	maintenanceOrders: [MaintenanceOrderDto, ...MaintenanceOrderDto[]];
	expenseCategory: ExpenseCategoryDto;
	file: string;
}

export interface TestOptions {
	// auth
	userRoleType: RoleDto['roleType'];
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
