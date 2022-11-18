export enum PageTab {
	Files = 'files',
	Financials = 'financials',
	Occupancy = 'occupancy',
	Expenses = 'expenses',

	Properties = 'properties',
	Units = 'units',
	Invoices = 'invoices',
	Leases = 'leases',

	// Admin
	Roles = 'roles',
	Balance = 'balance',

	Settings = 'settings',
	ExpenseCategories = 'expense-categories',
}

export type OrganizationPageTab = PageTab.Roles | PageTab.ExpenseCategories;

export type TenantPageTab = PageTab.Leases | PageTab.Roles | PageTab.Files;

export type PortfolioPageTab =
	| PageTab.Properties
	| PageTab.Occupancy
	| PageTab.Files
	// Admin
	| PageTab.Roles
	| PageTab.Balance
	| PageTab.Expenses;

export type PropertyPageTab =
	| PageTab.Financials
	// | PageTab.Expenses
	| PageTab.Occupancy
	| PageTab.Units
	| PageTab.Files;

export type UnitPageTab =
	| PageTab.Financials
	// | PageTab.Expenses
	| PageTab.Leases
	| PageTab.Files;

export type LeasePageTab = PageTab.Invoices | PageTab.Files;

export type InvoicePageTab = PageTab.Files;

export type PageTabType =
	| OrganizationPageTab
	| TenantPageTab
	| PropertyPageTab
	| UnitPageTab
	| LeasePageTab
	| InvoicePageTab;
