import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import {
  Expense,
  ExpenseType,
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
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class CaslAbilityFactory {
  constructor(private prisma: PrismaService) {}

  private readonly logger = new Logger(CaslAbilityFactory.name);

  async defineAbility(user: UserDto) {
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, build } = new AbilityBuilder(AppAbility);

    // TODO fix type, handle case where auth0 user email is not in the database
    if (!user?.roles) {
      throw new ForbiddenException('User has no roles');
    }

    // Define user's own roles

    interface Own {
      orgs: string[];
      portfolios: string[];
      tenants: string[];
    }

    /**
     * A user's own role.
     * A user can belong to an organization (ex. creator, staff, admin, etc.)
     * A user can belong to a portfolio (ex. owner, family-member, etc)
     * A user can belong to a tenant (ex. renter)
     *
     * A user can have multiple roles. Example: An employee of a an organization is also a tenant of a different organization.
     * @example
     * own.portfolio represents read-only access to the user's portfolio.
     */
    const own: Own = { orgs: [], portfolios: [], tenants: [] };

    user.roles.forEach((role) => {
      if (role.organizationId) {
        own.orgs.push(role.organizationId);
      }
      if (role.portfolioId) {
        own.portfolios.push(role.portfolioId);
      }
      if (role.tenantId) {
        own.tenants.push(role.tenantId);
      }
    });

    // ### Role: Organization###
    // Define an org user's manageable entities
    if (own.orgs.length > 0) {
      const tenantsQ = this.prisma.tenant.findMany({
        select: { id: true },
        where: { organization: { id: { in: own.orgs } } },
      });

      const portfoliosQ = this.prisma.portfolio.findMany({
        select: { id: true },
        where: { organization: { id: { in: own.orgs } } },
      });

      const propertiesQ = this.prisma.property.findMany({
        select: { id: true },
        where: { portfolio: { organizationId: { in: own.orgs } } },
      });

      const unitsQ = this.prisma.unit.findMany({
        select: { id: true },
        where: {
          property: { portfolio: { organizationId: { in: own.orgs } } },
        },
      });

      // prettier-ignore
      const leasesQ = this.prisma.lease.findMany({
      select: { id: true },
      where: {
        OR: [
          { tenant: { organizationId: { in: own.orgs } } },
          { unit: { property: { portfolio: { organizationId: { in: own.orgs } } } } },
        ]
      },
    });

      // prettier-ignore
      const leaseInvoicesQ = this.prisma.leaseInvoice.findMany({
      select: { id: true },
      where: {
        lease: {
          OR: [
            { tenant: { organizationId: { in: own.orgs } } },
            { unit: { property: { portfolio: { organizationId: { in: own.orgs } } }, }, },
          ],
        },
      },
    });

      // prettier-ignore
      const expensesQ = this.prisma.expense.findMany({
      select: { id: true },
      where: {
        OR: [
          { portfolio: { organizationId: { in: own.orgs } } },
          { property: { portfolio: { organizationId: { in: own.orgs } } } },
          { unit: { property: { portfolio: { organizationId: { in: own.orgs } } } } },
        ],
      },
    });

      // prettier-ignore
      const maintenanceOrdersQ = this.prisma.maintenanceOrder.findMany({
      select: { id: true },
      where: {
        OR: [
          { tenant: { organizationId: { in: own.orgs } } },
          { portfolio: { organizationId: { in: own.orgs } } },
          { property: { portfolio: { organizationId: { in: own.orgs } } } },
          { unit: { property: { portfolio: { organizationId: { in: own.orgs } } }, }, },
        ],
      },
    });

      const now = Date.now();
      const [
        tenants,
        portfolios,
        properties,
        units,
        leases,
        leaseInvoices,
        expenses,
        maintenanceOrders,
      ] = await Promise.all([
        tenantsQ,
        portfoliosQ,
        propertiesQ,
        unitsQ,
        leasesQ,
        leaseInvoicesQ,
        expensesQ,
        maintenanceOrdersQ,
      ]);
      this.logger.log(
        `Defined manageable entities for organization user ${user.email} in ${
          Date.now() - now
        }ms`,
      );

      const manageable: OrgManageableResources = {
        orgs: own.orgs, // TODO consider contraining to superadmins only
        tenants: tenants.map((i) => i.id),
        portfolios: portfolios.map((i) => i.id),
        properties: properties.map((i) => i.id),
        units: units.map((i) => i.id),
        leases: leases.map((i) => i.id),
        leaseInvoices: leaseInvoices.map((i) => i.id),
        expenses: expenses.map((i) => i.id),
        maintenanceOrders: maintenanceOrders.map((i) => i.id),
      };

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
    }

    // ### Role: Portfolio ###
    // Define a portfolio user's readable entities
    if (own.portfolios.length > 0) {
      const tenantsQ = this.prisma.tenant.findMany({
        select: { id: true },
        where: {
          leases: {
            some: {
              unit: { property: { portfolioId: { in: own.portfolios } } },
            },
          },
        },
      });

      const propertiesQ = this.prisma.property.findMany({
        select: { id: true },
        where: { portfolioId: { in: own.portfolios } },
      });

      const unitsQ = this.prisma.unit.findMany({
        select: { id: true },
        where: { property: { portfolioId: { in: own.portfolios } } },
      });

      const leasesQ = this.prisma.lease.findMany({
        select: { id: true },
        where: { unit: { property: { portfolioId: { in: own.portfolios } } } },
      });

      const leaseInvoicesQ = this.prisma.leaseInvoice.findMany({
        select: { id: true },
        where: {
          lease: {
            unit: { property: { portfolioId: { in: own.portfolios } } },
          },
        },
      });

      const expensesQ = this.prisma.expense.findMany({
        select: { id: true },
        where: {
          OR: [
            { portfolioId: { in: own.portfolios } },
            { property: { portfolioId: { in: own.portfolios } } },
            { unit: { property: { portfolioId: { in: own.portfolios } } } },
          ],
        },
      });

      const maintenanceOrdersQ = this.prisma.maintenanceOrder.findMany({
        select: { id: true },
        where: {
          OR: [
            { portfolioId: { in: own.portfolios } },
            { property: { portfolioId: { in: own.portfolios } } },
            { unit: { property: { portfolioId: { in: own.portfolios } } } },
          ],
        },
      });

      const now = Date.now();
      const [
        tenants,
        properties,
        units,
        leases,
        leaseInvoices,
        expenses,
        maintenanceOrders,
      ] = await Promise.all([
        tenantsQ,
        propertiesQ,
        unitsQ,
        leasesQ,
        leaseInvoicesQ,
        expensesQ,
        maintenanceOrdersQ,
      ]);
      this.logger.log(
        `Defined readable entities for portfolio user ${user.email} in ${
          Date.now() - now
        }ms`,
      );

      const readable: PortfolioReadableResources = {
        tenants: tenants.map((i) => i.id),
        portfolios: own.portfolios,
        properties: properties.map((i) => i.id),
        units: units.map((i) => i.id),
        leases: leases.map((i) => i.id),
        leaseInvoices: leaseInvoices.map((i) => i.id),
        expenses: expenses.map((i) => i.id),
        maintenanceOrders: maintenanceOrders.map((i) => i.id),
      };

      can(Action.Read, 'Tenant', {
        id: { in: readable.tenants },
      });

      can(Action.Read, ['Portfolio'], {
        id: { in: readable.portfolios },
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
        id: { in: readable.leaseInvoices },
      });

      can(Action.Read, ['Expense'], {
        id: { in: readable.expenses },
      });

      can(Action.Read, ['MaintenanceOrder'], {
        id: { in: readable.maintenanceOrders },
      });
    }

    // ### Role: Tenant###
    // Define a tenant user's readable entities
    // TODO restrict fields
    if (own.tenants.length > 0) {
      const leasesQ = this.prisma.lease.findMany({
        select: { id: true },
        where: { tenantId: { in: own.tenants } },
      });

      const leaseInvoicesQ = this.prisma.leaseInvoice.findMany({
        select: { id: true },
        where: { lease: { tenantId: { in: own.tenants } } },
      });

      const maintenanceOrdersQ = this.prisma.maintenanceOrder.findMany({
        select: { id: true },
        where: { tenantId: { in: own.tenants } },
      });

      const now = Date.now();
      const [leases, leaseInvoices, maintenanceOrders] = await Promise.all([
        leasesQ,
        leaseInvoicesQ,
        maintenanceOrdersQ,
      ]);
      this.logger.log(
        `Defined readable entities for tenant user ${user.email} in ${
          Date.now() - now
        }ms`,
      );

      const readable: TenantReadableResources = {
        tenants: own.tenants,
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

    return build();
  }

  /**
   * Helper to dry up authz logic in services.
   * Often, it will be required to pass in not only the basic subject,
   * but also the subject's organization, portfolio, tenant, etc.
   */
  async throwIfForbidden(user: UserDto, action: Action, subject: Subject) {
    const ability = await this.defineAbility(user);

    if (ability.cannot(action, subject)) {
      throw new ForbiddenException();
    }
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
  ExpenseType: P<ExpenseType>;
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
interface Resources {
  orgs: Resource[];
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
type PortfolioReadableResources = Pick<
  Resources,
  | 'tenants'
  | 'portfolios'
  | 'properties'
  | 'units'
  | 'leases'
  | 'leaseInvoices'
  | 'expenses'
  | 'maintenanceOrders'
>;
type TenantReadableResources = Pick<
  Resources,
  'tenants' | 'leases' | 'leaseInvoices' | 'maintenanceOrders'
>;
