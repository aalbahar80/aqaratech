import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import {
  Expense,
  Lease,
  LeaseInvoice,
  MaintenanceOrder,
  Organization,
  Plan,
  PlanInvoice,
  Portfolio,
  Property,
  Role,
  Tenant,
  Unit,
  User,
} from '@prisma/client';
import { PortfolioAbility } from 'src/casl/abilities/portfolio-ability';
import { TenantAbility } from 'src/casl/abilities/tenant-ability';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CaslAbilityFactory {
  constructor(
    private prisma: PrismaService,
    private portfolioAbility: PortfolioAbility,
    private tenantAbility: TenantAbility,
  ) {}

  private readonly logger = new Logger(CaslAbilityFactory.name);

  /**
   * Creates a CASL ability for a given role. Does so by querying the database for
   * id's of all the objects that the role has access to.
   * Then, creates the ability using the id's.
   */
  async defineAbility({ email, xRoleId }: { email: string; xRoleId?: string }) {
    const now = Date.now();

    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, build } = new AbilityBuilder(AppAbility);

    // We use email (NOT xRoleId) to find the user/role info.
    // Email is verified by Auth0/jwt, so it's safe to use.
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { roles: true },
    });

    // Once we retrieve the user, we can then use the xRoleId header to select their desired role.
    const role = user.roles.find((role) => role.id === xRoleId);
    if (!role) {
      this.logger.log(user);
      // Log the userId for our own reference.
      // But don't return it in the error message as it is priviliged info.
      this.logger.error(
        `Could not resolve roleId ${xRoleId} for userId: ${user.id}`,
      );
      throw new ForbiddenException('Role not found');
    }

    // ### DEFINE ABILITY ###

    can(Action.Read, ['User'], { id: { equals: user.id } });

    // ### Role: Organization Admin###
    if (role.roleType === 'ORGADMIN') {
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
      const leaseInvoicesQ = this.prisma.leaseInvoice.findMany({
      select: { id: true },
      where: {
        lease: {
          OR: [
            { tenant: { organizationId: { equals: role.organizationId} } },
            { unit: { property: { portfolio: { organizationId: { equals: role.organizationId} } }, }, },
          ],
        },
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
        leaseInvoices,
        expenses,
        maintenanceOrders,
      ] = await Promise.all([
        rolesQ,
        tenantsQ,
        portfoliosQ,
        propertiesQ,
        unitsQ,
        leasesQ,
        leaseInvoicesQ,
        expensesQ,
        maintenanceOrdersQ,
      ]);

      const manageable: OrgManageableResources = {
        orgs: [role.organizationId], // TODO consider contraining to superadmins only
        roles: roles.map((r) => r.id),
        tenants: tenants.map((i) => i.id),
        portfolios: portfolios.map((i) => i.id),
        properties: properties.map((i) => i.id),
        units: units.map((i) => i.id),
        leases: leases.map((i) => i.id),
        leaseInvoices: leaseInvoices.map((i) => i.id),
        expenses: expenses.map((i) => i.id),
        maintenanceOrders: maintenanceOrders.map((i) => i.id),
      };

      // TODO: limit fields
      // TODO only superadmins can manage orgs/orgSettings?
      can([Action.Read, Action.Update], ['Organization'], {
        id: { in: manageable.orgs },
      });

      // TODO: limit fields
      // TODO only superadmins can manage org roles?
      can(Action.Manage, ['Role'], {
        OR: [
          { id: { in: manageable.roles } },
          {
            OR: [
              { organizationId: { in: manageable.orgs } },
              { portfolioId: { in: manageable.portfolios } },
              { tenantId: { in: manageable.tenants } },
            ],
          },
        ],
      });

      can(Action.Manage, ['Role'], {
        OR: [
          { organizationId: { in: manageable.orgs } },
          { portfolioId: { in: manageable.portfolios } },
          { tenantId: { in: manageable.tenants } },
        ],
      });

      // TODO handle updating parentId's by adding a cannot clause
      can(Action.Manage, ['Tenant'], {
        OR: [
          { id: { in: manageable.tenants } },
          { organizationId: { in: manageable.orgs } }, // new tenant
        ],
      });

      can(Action.Manage, ['Portfolio'], {
        OR: [
          { id: { in: manageable.portfolios } },
          { organizationId: { in: manageable.orgs } },
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

      // Seperate Read ability for better performance
      can(Action.Read, ['LeaseInvoice'], {
        id: { in: manageable.leaseInvoices },
      });

      can([Action.Create, Action.Update, Action.Delete], ['LeaseInvoice'], {
        OR: [
          { id: { in: manageable.leaseInvoices } },
          { leaseId: { in: manageable.leases } },
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
    } else if (role.roleType === 'PORTFOLIO' && role.portfolioId) {
      // type hack
      const portfolioRole = {
        ...role,
        roleType: role.roleType,
        portfolioId: role.portfolioId,
      };
      await this.portfolioAbility.define(portfolioRole, can);
    } else if (role.roleType === 'TENANT' && role.tenantId) {
      // type hack
      const tenantRole = {
        ...role,
        roleType: role.roleType,
        tenantId: role.tenantId,
      };
      await this.tenantAbility.define(tenantRole, can);
    }

    this.logger.log(
      `Defined manageable entities for role ${role.id} in ${
        Date.now() - now
      }ms`,
    );

    return build();
  }
}

export type AppAbility = PrismaAbility<[string, Subject]>;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

// type withoutAbstract<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
// type P<T> = withoutAbstract<Partial<T>>;
type P<T> = Partial<T>;
// type P<T> = T;
export type Subject = Subjects<{
  Expense: P<Expense>;
  Lease: P<Lease>;
  MaintenanceOrder: P<MaintenanceOrder>;
  Organization: P<Organization>;
  Plan: P<Plan>;
  PlanInvoice: P<PlanInvoice>;
  Portfolio: P<Portfolio>;
  Property: P<Property>;
  Role: P<Role>;
  Tenant: Partial<Tenant>;
  LeaseInvoice: P<LeaseInvoice>;
  Unit: P<Unit>;
  User: P<User>;
}>;

type Resource = string;
export interface Resources {
  orgs: Resource[];
  roles: Resource[];
  tenants: Resource[];
  portfolios: Resource[];
  properties: Resource[];
  units: Resource[];
  leases: Resource[];
  leaseInvoices: Resource[];
  expenses: Resource[];
  maintenanceOrders: Resource[];
}

type OrgManageableResources = Resources;
