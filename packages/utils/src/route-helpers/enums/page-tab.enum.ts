export enum PageTab {
	Files = 'files',
	Occupancy = 'occupancy',

	Properties = 'properties',
	Units = 'units',
	Invoices = 'invoices',
	Leases = 'leases',
	Maintenance = 'maintenance',
	Messages = 'messages',

	// Admin
	Roles = 'roles',
	Balance = 'balance',

	ExpenseCategories = 'expense-categories',
	Billing = 'billing',

	Contract = 'contract',
}

export type OrganizationPageTab =
	| PageTab.Roles
	| PageTab.ExpenseCategories
	| PageTab.Billing;

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

export type LeasePageTab = PageTab.Invoices | PageTab.Files | PageTab.Contract;

export type InvoicePageTab = PageTab.Files | PageTab.Messages;

export type ExpensePageTab = PageTab.Files;

export type MaintenancePageTab = PageTab.Files;

export type PageTabType =
	| OrganizationPageTab
	| TenantPageTab
	| PropertyPageTab
	| UnitPageTab
	| LeasePageTab
	| InvoicePageTab
	| ExpensePageTab
	| MaintenancePageTab;
