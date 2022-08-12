import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, Resources, TCan } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfolioAbility {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(PortfolioAbility.name);

  async define(role: Role, can: TCan) {
    this.logger.log('Defining ability for role', role.id);

    if (role.roleType !== 'PORTFOLIO' || !role.portfolioId) {
      throw new Error('roleType is not portfolio or portfolioId is not set');
    }

    const tenantsQ = this.prisma.tenant.findMany({
      select: { id: true },
      where: {
        leases: {
          some: {
            unit: { property: { portfolioId: { equals: role.portfolioId } } },
          },
        },
      },
    });

    const propertiesQ = this.prisma.property.findMany({
      select: { id: true },
      where: { portfolioId: { equals: role.portfolioId } },
    });

    const unitsQ = this.prisma.unit.findMany({
      select: { id: true },
      where: { property: { portfolioId: { equals: role.portfolioId } } },
    });

    const leasesQ = this.prisma.lease.findMany({
      select: { id: true },
      where: {
        unit: { property: { portfolioId: { equals: role.portfolioId } } },
      },
    });

    const maintenanceOrdersQ = this.prisma.maintenanceOrder.findMany({
      select: { id: true },
      where: {
        OR: [
          { portfolioId: { equals: role.portfolioId } },
          { property: { portfolioId: { equals: role.portfolioId } } },
          {
            unit: { property: { portfolioId: { equals: role.portfolioId } } },
          },
        ],
      },
    });

    const [tenants, properties, units, leases, maintenanceOrders] =
      await Promise.all([
        tenantsQ,
        propertiesQ,
        unitsQ,
        leasesQ,
        maintenanceOrdersQ,
      ]);

    const readable: PortfolioReadableResources = {
      tenants: tenants.map((i) => i.id),
      properties: properties.map((i) => i.id),
      units: units.map((i) => i.id),
      leases: leases.map((i) => i.id),
      maintenanceOrders: maintenanceOrders.map((i) => i.id),
    };

    // TODO: limit fields
    can(Action.Read, ['Role'], { tenantId: { in: readable.tenants } });

    can(Action.Read, 'Tenant', {
      id: { in: readable.tenants },
    });

    can(Action.Read, ['Portfolio'], {
      id: { equals: role.portfolioId },
    });

    can(Action.Read, ['Property'], {
      id: { in: readable.properties },
    });

    can(Action.Read, ['Unit'], {
      id: { in: readable.units },
    });

    can(Action.Read, ['Lease'], {
      id: { in: readable.leases },
    });

    can(Action.Read, ['LeaseInvoice'], {
      lease: { unit: { property: { portfolioId: { equals: role.portfolioId } } } }, // prettier-ignore
    });

    can(Action.Read, ['Expense'], {
      OR: [
        { portfolioId: { equals: role.portfolioId } },
        { property: { portfolioId: { equals: role.portfolioId } } },
        {
          unit: { property: { portfolioId: { equals: role.portfolioId } } },
        },
      ],
    });

    can(Action.Read, ['MaintenanceOrder'], {
      id: { in: readable.maintenanceOrders },
    });
  }
}

type PortfolioReadableResources = Pick<
  Resources,
  'tenants' | 'properties' | 'units' | 'leases' | 'maintenanceOrders'
>;
