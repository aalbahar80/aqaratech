import type { Entity } from '@self/utils';

interface EntityForms {
	plural: string;
	singular: string;
}

export const entity = {
	user: {
		plural: 'Users',
		singular: 'User',
	},
	organization: {
		plural: 'Organizations',
		singular: 'Organization',
	},
	role: {
		plural: 'Roles',
		singular: 'Role',
	},
	tenant: {
		plural: 'Customers',
		singular: 'Customer',
	},
	portfolio: {
		plural: 'Owners',
		singular: 'Owner',
	},
	property: {
		plural: 'Properties',
		singular: 'Property',
	},
	unit: {
		plural: 'Units',
		singular: 'Unit',
	},
	lease: {
		plural: 'Leases',
		singular: 'Lease',
	},
	leaseInvoice: {
		plural: 'Invoices',
		singular: 'Invoice',
	},
	maintenanceOrder: {
		plural: 'Maintenance',
		singular: 'Maintenance',
	},
	payout: {
		plural: 'Transfers',
		singular: 'Transfer',
	},
	expense: {
		plural: 'Expenses',
		singular: 'Expense',
	},
	expenseCategory: {
		plural: 'Expense Categories',
		singular: 'Expense Category',
	},
	file: {
		plural: 'Files',
		singular: 'File',
	},
	message: {
		plural: 'Messages',
		singular: 'Message',
	},
} satisfies Record<Entity, EntityForms> & Record<string, EntityForms>;
