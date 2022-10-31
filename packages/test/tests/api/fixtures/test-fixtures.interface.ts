import type {
	Fixtures,
	PlaywrightTestArgs,
	PlaywrightWorkerArgs,
} from '@playwright/test';
import type {
	ExpenseCategoryFactoryParams,
	LeaseInvoiceFactoryParams,
	RoleFactoryParams,
} from '@self/seed';
import type {
	ExpenseCategoryDto,
	ExpenseDto,
	LeaseDto,
	LeaseInvoiceDto,
	OrganizationCreatedDto,
	PortfolioDto,
	PropertyDto,
	RoleDto,
	TenantDto,
	UnitDto,
} from '../../../types/api';

export interface TestFixtures {
	// auth
	scopedRequest: PlaywrightTestArgs['request'];

	org: OrganizationCreatedDto;
	role: RoleDto;
	tenant: TenantDto;
	portfolio: PortfolioDto;
	property: PropertyDto;
	unit: UnitDto;
	lease: LeaseDto;
	invoice: LeaseInvoiceDto;
	expense: ExpenseDto;
	expenseCategory: ExpenseCategoryDto;
	file: string;
}

export interface TestOptions {
	// auth
	userRoleType: RoleDto['roleType'];
	roleParams: RoleFactoryParams | undefined;
	withRoleId: string | undefined;

	invoiceParams: LeaseInvoiceFactoryParams | undefined;
	expenseCategoryParams: ExpenseCategoryFactoryParams | undefined;
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
