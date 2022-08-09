import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, Resources } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantAbility {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(TenantAbility.name);

  async define(role: TenantRole, can: any) {
    this.logger.log('Defining ability for role', role.id);
    // TODO restrict fields
    const leasesQ = this.prisma.lease.findMany({
      select: { id: true },
      where: { tenantId: { equals: role.tenantId } },
    });

    const leaseInvoicesQ = this.prisma.leaseInvoice.findMany({
      select: { id: true },
      where: { lease: { tenantId: { equals: role.tenantId } } },
    });

    const maintenanceOrdersQ = this.prisma.maintenanceOrder.findMany({
      select: { id: true },
      where: { tenantId: { equals: role.tenantId } },
    });

    const [leases, leaseInvoices, maintenanceOrders] = await Promise.all([
      leasesQ,
      leaseInvoicesQ,
      maintenanceOrdersQ,
    ]);

    const readable: TenantReadableResources = {
      tenants: [role.tenantId],
      leases: leases.map((i) => i.id),
      leaseInvoices: leaseInvoices.map((i) => i.id),
      maintenanceOrders: maintenanceOrders.map((i) => i.id),
    };

    can(Action.Read, 'Tenant', {
      id: { in: readable.tenants },
    });

    can(Action.Read, ['Lease'], {
      id: { in: readable.leases },
    });

    // TODO some fields should be public
    can(Action.Read, ['LeaseInvoice'], {
      id: { in: readable.leaseInvoices },
    });

    can(Action.Read, ['MaintenanceOrder'], {
      id: { in: readable.maintenanceOrders },
    });
  }
}

// TODO ts-toolbelt to make tenantId not nullable
type TenantRole = Omit<Role, 'tenantId'> & { tenantId: string };
type TenantReadableResources = Pick<
  Resources,
  'tenants' | 'leases' | 'leaseInvoices' | 'maintenanceOrders'
>;
