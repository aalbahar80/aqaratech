import type {
	Expense as ExpenseBase,
	Lease as LeaseBase,
	LeaseInvoice as LeaseInvoiceBase,
	MaintenanceOrder as MaintenanceOrderBase,
	Organization as OrganizationBase,
	Payout as PayoutBase,
	Portfolio as PortfolioBase,
	Property as PropertyBase,
	Role as RoleBase,
	Tenant as TenantBase,
	Unit as UnitBase,
	User as UserBase,
} from '@prisma/client';

type DateAsString<T> = {
	[K in keyof T]: T[K] extends Date
		? Date | string
		: T[K] extends Date | null
		? Date | string | null
		: T[K];
};

export type User = DateAsString<UserBase>;
export type Organization = DateAsString<OrganizationBase>;
export type Role = DateAsString<RoleBase>;
export type Tenant = DateAsString<TenantBase>;
export type Portfolio = DateAsString<PortfolioBase>;
export type Property = DateAsString<PropertyBase>;
export type Unit = DateAsString<UnitBase>;
export type Lease = DateAsString<LeaseBase>;
export type LeaseInvoice = DateAsString<LeaseInvoiceBase>;
export type Expense = DateAsString<ExpenseBase>;
export type Payout = DateAsString<PayoutBase>;
export type MaintenanceOrder = DateAsString<MaintenanceOrderBase>;
