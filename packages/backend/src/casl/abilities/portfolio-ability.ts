import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, TCan } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfolioAbility {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(PortfolioAbility.name);

  define(role: Role, can: TCan) {
    this.logger.log('Defining ability for role', role.id);

    if (role.roleType !== 'PORTFOLIO' || !role.portfolioId) {
      throw new Error('roleType is not portfolio or portfolioId is not set');
    }

    // TODO: limit fields
    can(Action.Read, ['Role'], {
      tenant: { leases: { some: { unit: { property: { portfolioId: { equals: role.portfolioId } } } } } }, // prettier-ignore
    });

    can(Action.Read, 'Tenant', {
      leases: { some: { unit: { property: { portfolioId: { equals: role.portfolioId } } } } }, // prettier-ignore
    });

    can(Action.Read, ['Portfolio'], {
      id: { equals: role.portfolioId },
    });

    can(Action.Read, ['Property'], {
      portfolioId: { equals: role.portfolioId },
    });

    can(Action.Read, ['Unit'], {
      property: { portfolioId: { equals: role.portfolioId } },
    });

    can(Action.Read, ['Lease'], {
      unit: { property: { portfolioId: { equals: role.portfolioId } } },
    });

    can(Action.Read, ['LeaseInvoice'], {
      lease: { unit: { property: { portfolioId: { equals: role.portfolioId } } } }, // prettier-ignore
    });

    can(Action.Read, ['Expense'], {
      OR: [
        { portfolioId: { equals: role.portfolioId } },
        { property: { portfolioId: { equals: role.portfolioId } } },
        { unit: { property: { portfolioId: { equals: role.portfolioId } } } },
      ],
    });

    can(Action.Read, ['MaintenanceOrder'], {
      OR: [
        { portfolioId: { equals: role.portfolioId } },
        { property: { portfolioId: { equals: role.portfolioId } } },
        { unit: { property: { portfolioId: { equals: role.portfolioId } } } },
      ],
    });
  }
}
