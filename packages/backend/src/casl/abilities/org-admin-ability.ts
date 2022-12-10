import { Role } from '@prisma/client';

import { TCan, TCannot } from 'src/casl/abilities/ability-types';
import { Action } from 'src/casl/action.enum';

export const defineOrgAdminAbility = (
	role: Role,
	can: TCan,
	cannot: TCannot,
) => {
	if (role.roleType !== 'ORGADMIN') {
		throw new Error('roleType is not ORGADMIN');
	}

	// TODO: limit fields
	// TODO only superadmins can manage orgs/orgSettings?
	can(Action.Manage, ['Organization'], {
		id: { equals: role.organizationId },
	});

	// TODO: limit fields
	// TODO only superadmins can manage org roles?

	can(Action.Manage, 'Role', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'Tenant', {
		organizationId: { equals: role.organizationId }, // new tenant
	});

	can(Action.Manage, 'Portfolio', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'Property', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'Unit', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'Lease', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'LeaseInvoice', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'Expense', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'MaintenanceOrder', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'Payout', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'File', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Manage, 'ExpenseCategory', {
		organizationId: { equals: role.organizationId },
	});

	// These fields are never allowed to be updated. This is necessary to prevent data from going out of sync.
	// Restrict updating any foreign key. Especially important for the organizationId, portfolioId, tenantId.
	cannot(Action.Update, 'all', [
		'organizationId',
		'portfolioId',
		'propertyId',
		'unitId',
		'leaseId',
		'leaseInvoiceId',
		'expenseId',
		'maintenanceOrderId',
	]);
};
