export type Entity = DBEntity | NonDBEntity;

export type DBEntity =
	| "organization"
	| "role"
	| "tenant"
	| "portfolio"
	| "property"
	| "unit"
	| "lease"
	| "leaseInvoice"
	| "expense"
	| "maintenanceOrder";

export type NonDBEntity = "member" | "expenseCategory" | "file";
