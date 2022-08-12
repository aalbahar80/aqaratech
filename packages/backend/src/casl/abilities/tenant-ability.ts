import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, Resources, TCan } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TenantAbility {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(TenantAbility.name);

  async define(role: Role, can: TCan) {
    this.logger.log('Defining ability for role', role.id);

    if (role.roleType !== 'TENANT' || !role.tenantId) {
      throw new Error('roleType is not tenant or tenantId is not set');
    }

    // TODO restrict fields
    const leasesQ = this.prisma.lease.findMany({
      select: { id: true },
      where: { tenantId: { equals: role.tenantId } },
    });

    const maintenanceOrdersQ = this.prisma.maintenanceOrder.findMany({
      select: { id: true },
      where: { tenantId: { equals: role.tenantId } },
    });

    const [leases, maintenanceOrders] = await Promise.all([
      leasesQ,
      maintenanceOrdersQ,
    ]);

    const readable: TenantReadableResources = {
      leases: leases.map((i) => i.id),
      maintenanceOrders: maintenanceOrders.map((i) => i.id),
    };

    can(Action.Read, 'Tenant', {
      id: { equals: role.tenantId },
    });

    can(Action.Read, ['Lease'], {
      id: { in: readable.leases },
    });

    // TODO some fields should be public
    can(Action.Read, ['LeaseInvoice'], {
      lease: { tenantId: { equals: role.tenantId } },
    });

    can(Action.Read, ['MaintenanceOrder'], {
      id: { in: readable.maintenanceOrders },
    });
  }
}

type TenantReadableResources = Pick<Resources, 'leases' | 'maintenanceOrders'>;
