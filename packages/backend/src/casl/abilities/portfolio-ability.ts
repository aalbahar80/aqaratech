import { Role } from '@prisma/client';

import { TCan } from 'src/casl/abilities/ability-types';
import { Action } from 'src/casl/action.enum';

export const definePortfolioAbility = (role: Role, can: TCan) => {
	if (role.roleType !== 'PORTFOLIO' || !role.portfolioId) {
		throw new Error('roleType is not portfolio or portfolioId is not set');
	}

	// TODO: limit fields
	can(Action.Read, ['Role'], {
		tenant: { leases: { some: { portfolioId: { equals: role.portfolioId } } } }, // prettier-ignore
	});

	can(Action.Read, 'Tenant', {
		leases: { some: { portfolioId: { equals: role.portfolioId } } }, // prettier-ignore
	});

	can(Action.Read, ['Portfolio'], {
		id: { equals: role.portfolioId },
	});

	can(Action.Read, ['Property'], {
		portfolioId: { equals: role.portfolioId },
	});

	can(Action.Read, ['Unit'], {
		portfolioId: { equals: role.portfolioId },
	});

	can(Action.Read, ['Lease'], {
		portfolioId: { equals: role.portfolioId },
	});

	can(Action.Read, ['LeaseInvoice'], {
		portfolioId: { equals: role.portfolioId },
	});

	can(Action.Read, ['Expense'], {
		portfolioId: { equals: role.portfolioId },
	});

	can(Action.Read, ['MaintenanceOrder'], {
		portfolioId: { equals: role.portfolioId },
	});

	can(Action.Read, ['Payout'], {
		portfolioId: { equals: role.portfolioId },
	});

	can(Action.Read, 'ExpenseCategory', {
		organizationId: { equals: role.organizationId },
	});

	can(Action.Read, 'File', {
		organizationId: { equals: role.organizationId },
	});
};
