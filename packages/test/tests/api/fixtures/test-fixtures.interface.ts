import type { Fixtures, PlaywrightTestArgs } from '@playwright/test';
import type { LeaseInvoiceFactoryParams } from '@self/seed';
import type {
	ExpenseCategoryDto,
	ExpenseDto,
	LeaseDto,
	LeaseInvoiceDto,
	OrganizationCreatedDto,
	PortfolioDto,
	PropertyDto,
	TenantDto,
	UnitDto,
} from '../../../types/api';

export interface TestFixtures {
	org: OrganizationCreatedDto;
	tenant: TenantDto;
	portfolio: PortfolioDto;
	property: PropertyDto;
	unit: UnitDto;
	lease: LeaseDto;
	invoice: LeaseInvoiceDto;
	expense: ExpenseDto;
	file: string;
	expenseCategory: ExpenseCategoryDto;
}

export interface TestOptions {
	withRoleId: string | undefined;
	invoiceParams: LeaseInvoiceFactoryParams | undefined;
}

export type AllFixtures = Fixtures<
	TestFixtures & TestOptions,
	// eslint-disable-next-line @typescript-eslint/ban-types
	{},
	PlaywrightTestArgs
>;

// `AllFixtures` type taken from TestType.extend.params[0]
// extend<T extends KeyValue, W extends KeyValue = {}>(fixtures: Fixtures<T, W, TestArgs, WorkerArgs>): TestType<TestArgs & T, WorkerArgs & W>;
