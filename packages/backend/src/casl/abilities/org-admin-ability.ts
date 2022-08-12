import { Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Action, Resources, TCan } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrgAdminAbility {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(OrgAdminAbility.name);

  async define(role: Role, can: TCan) {
    this.logger.log('Defining ability for role', role.id);

    if (role.roleType !== 'ORGADMIN') {
      throw new Error('roleType is not ORGADMIN');
    }

    const rolesQ = this.prisma.role.findMany({
      where: {
        OR: [
          { organization: { id: { equals: role.organizationId } } },
          { portfolio: { organizationId: { equals: role.organizationId } } },
          { tenant: { organizationId: { equals: role.organizationId } } },
        ],
      },
    });

    const tenantsQ = this.prisma.tenant.findMany({
      select: { id: true },
      where: { organization: { id: { equals: role.organizationId } } },
    });

    const portfoliosQ = this.prisma.portfolio.findMany({
      select: { id: true },
      where: { organization: { id: { equals: role.organizationId } } },
    });

    const propertiesQ = this.prisma.property.findMany({
      select: { id: true },
      where: {
        portfolio: { organizationId: { equals: role.organizationId } },
      },
    });

    const unitsQ = this.prisma.unit.findMany({
      select: { id: true },
      where: {
        property: {
          portfolio: { organizationId: { equals: role.organizationId } },
        },
      },
    });

    // prettier-ignore
    const leasesQ = this.prisma.lease.findMany({
      select: { id: true },
      where: {
        OR: [
          { tenant: { organizationId: { equals: role.organizationId} } },
          { unit: { property: { portfolio: { organizationId: { equals: role.organizationId} } } } },
        ]
      },
    });

    // prettier-ignore
    const expensesQ = this.prisma.expense.findMany({
      select: { id: true },
      where: {
        OR: [
          { portfolio: { organizationId: { equals: role.organizationId} } },
          { property: { portfolio: { organizationId: { equals: role.organizationId} } } },
          { unit: { property: { portfolio: { organizationId: { equals: role.organizationId} } } } },
        ],
      },
    });

    // prettier-ignore
    const maintenanceOrdersQ = this.prisma.maintenanceOrder.findMany({
      select: { id: true },
      where: {
        OR: [
          { tenant: { organizationId: { equals: role.organizationId} } },
          { portfolio: { organizationId: { equals: role.organizationId} } },
          { property: { portfolio: { organizationId: { equals: role.organizationId} } } },
          { unit: { property: { portfolio: { organizationId: { equals: role.organizationId} } }, }, },
        ],
      },
    });

    const [
      roles,
      tenants,
      portfolios,
      properties,
      units,
      leases,
      // leaseInvoices,
      expenses,
      maintenanceOrders,
    ] = await Promise.all([
      rolesQ,
      tenantsQ,
      portfoliosQ,
      propertiesQ,
      unitsQ,
      leasesQ,
      expensesQ,
      maintenanceOrdersQ,
    ]);

    const manageable: OrgManageableResources = {
      roles: roles.map((r) => r.id),
      tenants: tenants.map((i) => i.id),
      portfolios: portfolios.map((i) => i.id),
      properties: properties.map((i) => i.id),
      units: units.map((i) => i.id),
      leases: leases.map((i) => i.id),
      expenses: expenses.map((i) => i.id),
      maintenanceOrders: maintenanceOrders.map((i) => i.id),
    };

    // TODO: limit fields
    // TODO only superadmins can manage orgs/orgSettings?
    can([Action.Read, Action.Update], ['Organization'], {
      id: { equals: role.organizationId },
    });

    // TODO: limit fields
    // TODO only superadmins can manage org roles?
    can(Action.Manage, ['Role'], {
      OR: [
        { id: { in: manageable.roles } },
        {
          OR: [
            { organizationId: { equals: role.organizationId } },
            { portfolioId: { in: manageable.portfolios } },
            { tenantId: { in: manageable.tenants } },
          ],
        },
      ],
    });

    can(Action.Manage, ['Role'], {
      OR: [
        { organizationId: { equals: role.organizationId } },
        { portfolioId: { in: manageable.portfolios } },
        { tenantId: { in: manageable.tenants } },
      ],
    });

    // TODO handle updating parentId's by adding a cannot clause
    can(Action.Manage, ['Tenant'], {
      OR: [
        { id: { in: manageable.tenants } },
        { organizationId: { equals: role.organizationId } }, // new tenant
      ],
    });

    can(Action.Manage, ['Portfolio'], {
      OR: [
        { id: { in: manageable.portfolios } },
        { organizationId: { equals: role.organizationId } },
      ],
    });

    can(Action.Manage, ['Property'], {
      OR: [
        { id: { in: manageable.properties } },
        { portfolioId: { in: manageable.portfolios } },
      ],
    });

    can(Action.Manage, ['Unit'], {
      OR: [
        { id: { in: manageable.units } },
        { propertyId: { in: manageable.properties } },
      ],
    });

    can(Action.Manage, ['Lease'], {
      OR: [
        { id: { in: manageable.leases } },
        {
          // TODO add condition to only allow if unit & tenant in same org?
          // Otherwise, define ability on a per-role basis from x-role-id header
          AND: [
            { unitId: { in: manageable.units } },
            { tenantId: { in: manageable.tenants } },
          ],
        },
      ],
    });

    can(Action.Manage, ['LeaseInvoice'], {
      OR: [
        { lease: { tenant: { organizationId: { equals: role.organizationId } }, }, }, // prettier-ignore
        { lease: { unit: { property: { portfolio: { organizationId: { equals: role.organizationId } } } } }, }, // prettier-ignore
      ],
    });

    // Seperate Read ability for better performance
    can(Action.Read, ['Expense'], {
      id: { in: manageable.expenses },
    });

    can([Action.Create, Action.Update, Action.Delete], ['Expense'], {
      OR: [
        { id: { in: manageable.expenses } },
        {
          OR: [
            { unitId: { in: manageable.units } },
            { propertyId: { in: manageable.properties } },
            { portfolioId: { in: manageable.portfolios } },
            // {maintenanceOrderId: { in: manageable.maintenanceOrders } },
          ],
        },
      ],
    });

    // Seperate Read ability for better performance
    can(Action.Read, ['MaintenanceOrder'], {
      id: { in: manageable.maintenanceOrders },
    });

    can([Action.Create, Action.Update, Action.Delete], ['MaintenanceOrder'], {
      OR: [
        { id: { in: manageable.maintenanceOrders } },
        {
          OR: [
            { tenantId: { in: manageable.tenants } },
            { unitId: { in: manageable.units } },
            { propertyId: { in: manageable.properties } },
            { portfolioId: { in: manageable.portfolios } },
          ],
        },
      ],
    });
  }
}

type OrgManageableResources = Pick<
  Resources,
  | 'portfolios'
  | 'roles'
  | 'tenants'
  | 'properties'
  | 'units'
  | 'leases'
  | 'expenses'
  | 'maintenanceOrders'
>;
