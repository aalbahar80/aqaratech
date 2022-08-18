import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, TCan, TCannot } from 'src/casl/casl-ability.factory';

@Injectable()
export class OrgAdminAbility {
  private readonly logger = new Logger(OrgAdminAbility.name);

  define(role: Role, can: TCan, cannot: TCannot) {
    this.logger.log('Defining ability for role', role.id);

    if (role.roleType !== 'ORGADMIN') {
      throw new Error('roleType is not ORGADMIN');
    }

    // TODO: limit fields
    // TODO only superadmins can manage orgs/orgSettings?
    can([Action.Read, Action.Update, Action.Delete], ['Organization'], {
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
  }
}
