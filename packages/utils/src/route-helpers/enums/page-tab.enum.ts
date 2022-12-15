export enum PageTab {
	Files = 'files',
	Occupancy = 'occupancy',

	Properties = 'properties',
	Units = 'units',
	Invoices = 'invoices',
	Leases = 'leases',
	Maintenance = 'maintenance',

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
	| PageTab.Balance;

export type PropertyPageTab =
	| PageTab.Occupancy
	| PageTab.Units
	| PageTab.Files
	| PageTab.Maintenance;

export type UnitPageTab = PageTab.Leases | PageTab.Files | PageTab.Maintenance;

export type LeasePageTab = PageTab.Invoices | PageTab.Files;

export type InvoicePageTab = PageTab.Files;

export type PageTabType =
	| OrganizationPageTab
	| TenantPageTab
	| PropertyPageTab
	| UnitPageTab
	| LeasePageTab
	| InvoicePageTab;
