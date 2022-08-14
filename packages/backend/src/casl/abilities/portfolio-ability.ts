import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, TCan } from 'src/casl/casl-ability.factory';

@Injectable()
export class PortfolioAbility {
  private readonly logger = new Logger(PortfolioAbility.name);

  define(role: Role, can: TCan) {
    this.logger.log('Defining ability for role', role.id);

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
  }
}
