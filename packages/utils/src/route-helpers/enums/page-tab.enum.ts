export enum PageTab {
	Files = 'files',
	Financials = 'financials',
	Occupancy = 'occupancy',

	Properties = 'properties',
	Units = 'units',
	Invoices = 'invoices',
	Leases = 'leases',

	// Admin
	Roles = 'roles',
	Balance = 'balance',
}

export type PortfolioPageTab =
	| PageTab.Properties
	| PageTab.Occupancy
	| PageTab.Files
	// Admin
	| PageTab.Roles
	| PageTab.Balance;

export type PropertyPageTab =
	| PageTab.Financials
	| PageTab.Occupancy
	| PageTab.Units
	| PageTab.Files;

export type UnitPageTab = PageTab.Financials | PageTab.Leases | PageTab.Files;

export type LeasePageTab = PageTab.Invoices | PageTab.Files;

export type InvoicePageTab = PageTab.Files;

export type PageTabType =
	| PropertyPageTab
	| UnitPageTab
	| LeasePageTab
	| InvoicePageTab;
