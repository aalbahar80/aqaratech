import { Role } from '@prisma/client';
import { TCan } from 'src/casl/abilities/ability-types';
import { Action } from 'src/casl/action.enum';

export const defineTenantAbility = (role: Role, can: TCan) => {
	if (role.roleType !== 'TENANT' || !role.tenantId) {
		throw new Error('roleType is not tenant or tenantId is not set');
	}

	can(Action.Read, 'Tenant', {
		id: { equals: role.tenantId },
	});

	can(Action.Read, ['Lease'], {
		tenantId: { equals: role.tenantId },
	});

	// TODO some fields should be public
	can(Action.Read, ['LeaseInvoice'], {
		lease: { tenantId: { equals: role.tenantId } },
	});

	can(Action.Read, ['MaintenanceOrder'], {
		tenantId: { equals: role.tenantId },
	});
};
