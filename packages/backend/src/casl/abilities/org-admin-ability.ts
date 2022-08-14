import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, TCan } from 'src/casl/casl-ability.factory';

@Injectable()
export class OrgAdminAbility {
  private readonly logger = new Logger(OrgAdminAbility.name);

  define(role: Role, can: TCan) {
    this.logger.log('Defining ability for role', role.id);

    if (role.roleType !== 'ORGADMIN') {
      throw new Error('roleType is not ORGADMIN');
    }

    // TODO: limit fields
    // TODO only superadmins can manage orgs/orgSettings?
    can([Action.Read, Action.Update], ['Organization'], {
      id: { equals: role.organizationId },
    });

    // TODO: limit fields
    // TODO only superadmins can manage org roles?

    can(Action.Manage, ['Role'], {
      organizationId: { equals: role.organizationId },
    });

    // TODO handle updating parentId's by adding a cannot clause
    can(Action.Manage, ['Tenant'], {
      organizationId: { equals: role.organizationId }, // new tenant
    });

    can(Action.Manage, ['Portfolio'], {
      organizationId: { equals: role.organizationId },
    });

    can(Action.Manage, ['Property'], {
      portfolio: { organizationId: { equals: role.organizationId } },
    });

    can(Action.Manage, ['Unit'], {
      property: { portfolio: { organizationId: { equals: role.organizationId } } }, // prettier-ignore
    });

    can(Action.Manage, ['Lease'], {
      OR: [
        { tenant: { organizationId: { equals: role.organizationId } } },
        { unit: { property: { portfolio: { organizationId: { equals: role.organizationId } } } } }, // prettier-ignore
      ],
    });

    can(Action.Manage, ['LeaseInvoice'], {
      OR: [
        { lease: { tenant: { organizationId: { equals: role.organizationId } }, }, }, // prettier-ignore
        { lease: { unit: { property: { portfolio: { organizationId: { equals: role.organizationId } } } } }, }, // prettier-ignore
      ],
    });

    can(Action.Manage, ['Expense'], {
      OR: [
        { portfolio: { organizationId: { equals: role.organizationId } } },
        { property: { portfolio: { organizationId: { equals: role.organizationId } } } }, // prettier-ignore
        { unit: { property: { portfolio: { organizationId: { equals: role.organizationId } } } } }, // prettier-ignore
      ],
    });

    // can(Action.Manage, ['MaintenanceOrder'], {
    //   organizationId: { equals: role.organizationId }, // new tenant
    // });
  }
}
