import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  Expense,
  ExpenseType,
  Lease,
  MaintenanceOrder,
  Organization,
  Plan,
  PlanInvoice,
  Portfolio,
  Property,
  Role,
  Tenant,
  LeaseInvoice,
  Unit,
  User,
} from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class CaslAbilityFactory {
  constructor(private prisma: PrismaService) {}

  async defineAbility(user: UserDto) {
    // TODO cache db queries
    console.time('defineAbility');
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

    // Define an org user's manageable entities

    // interface ManageableResource {
    //   id: string;
    // }
    type ManageableResource = string;
    interface Manageable {
      orgs: ManageableResource[];
      tenants: ManageableResource[];
      portfolios: ManageableResource[];
      properties: ManageableResource[];
      units: ManageableResource[];
      leases: ManageableResource[];
      leaseInvoices: ManageableResource[];
      expenses: ManageableResource[];
      // maintenanceOrders: ManageableResource[];
    }

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
      where: { property: { portfolio: { organizationId: { in: own.orgs } } } },
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

    const [
      tenants,
      portfolios,
      properties,
      units,
      leases,
      leaseInvoices,
      expenses,
    ] = await Promise.all([
      tenantsQ,
      portfoliosQ,
      propertiesQ,
      unitsQ,
      leasesQ,
      leaseInvoicesQ,
      expensesQ,
    ]);

    const manageable: Manageable = {
      orgs: own.orgs, // TODO consider contraining to superadmins only
      tenants: tenants.map((i) => i.id),
      portfolios: portfolios.map((i) => i.id),
      properties: properties.map((i) => i.id),
      units: units.map((i) => i.id),
      leases: leases.map((i) => i.id),
      leaseInvoices: leaseInvoices.map((i) => i.id),
      expenses: expenses.map((i) => i.id),
    };

    console.log({ manageable });

    // ### Role: Organization###
    if (own.orgs.length > 0) {
      // fail fast if no orgs

      can(Action.Manage, ['Tenant'], {
        // organizationId: { in: orgs },
        id: { in: manageable.tenants },
      });

      can(Action.Manage, ['Portfolio'], {
        organizationId: { in: orgs },
      });

      can(Action.Manage, ['Expense'], {
        OR: [
          { portfolio: { is: { organizationId: { in: orgs } } } },
          {
            property: {
              is: { portfolio: { is: { organizationId: { in: orgs } } } },
            },
          },
          {
            unit: {
              is: {
                property: {
                  is: { portfolio: { is: { organizationId: { in: orgs } } } },
                },
              },
            },
          },
        ],
      });

      can(Action.Manage, ['Lease'], {
        OR: [
          {
            unit: {
              is: {
                property: {
                  is: { portfolio: { is: { organizationId: { in: orgs } } } },
                },
              },
            },
          },
          { tenant: { is: { organizationId: { in: orgs } } } },
        ],
      });

      can(Action.Manage, ['Property'], {
        portfolio: { is: { organizationId: { in: orgs } } },
      });

      can(Action.Manage, ['MaintenanceOrder'], {
        OR: [
          { portfolio: { is: { organizationId: { in: orgs } } } },
          {
            property: {
              is: { portfolio: { is: { organizationId: { in: orgs } } } },
            },
          },
          {
            unit: {
              is: {
                property: {
                  is: { portfolio: { is: { organizationId: { in: orgs } } } },
                },
              },
            },
          },
          { tenant: { is: { organizationId: { in: orgs } } } },
          // {expenses: {some: {}}}
        ],
      });

      can(Action.Manage, ['LeaseInvoice'], {
        lease: {
          is: {
            unit: {
              is: {
                property: {
                  is: { portfolio: { is: { organizationId: { in: orgs } } } },
                },
              },
            },
          },
        },
      });

      can(Action.Manage, ['Unit'], {
        property: {
          is: { portfolio: { is: { organizationId: { in: orgs } } } },
        },
      });
    }

    // ### Role: Portfolio ###
    // const portfoliosChangeMe = [];
    if (portfoliosChangeMe.length > 0) {
      // fail fast if no portfolios

      // can view tenants who have leases in their properties
      can(Action.Read, 'Tenant', {
        leases: {
          some: {
            unit: {
              property: {
                portfolioId: { in: portfoliosChangeMe },
              },
            },
          },
        },
      });

      can(Action.Read, ['Expense'], {
        OR: [
          { portfolioId: { in: portfoliosChangeMe } },
          { property: { portfolioId: { in: portfoliosChangeMe } } },
          { unit: { property: { portfolioId: { in: portfoliosChangeMe } } } },
        ],
      });

      can(Action.Read, ['MaintenanceOrder'], {
        OR: [
          { portfolioId: { in: portfoliosChangeMe } },
          { property: { portfolioId: { in: portfoliosChangeMe } } },
          { unit: { property: { portfolioId: { in: portfoliosChangeMe } } } },
        ],
      });

      can(Action.Read, ['Lease'], {
        unit: {
          is: { property: { is: { portfolioId: { in: portfoliosChangeMe } } } },
        },
      });

      can(Action.Read, ['Property'], {
        portfolioId: { in: portfoliosChangeMe },
      });

      can(Action.Read, ['LeaseInvoice'], {
        lease: {
          is: {
            unit: {
              is: {
                property: { portfolioId: { in: portfoliosChangeMe } },
              },
            },
          },
        },
      });

      can(Action.Read, ['Unit'], {
        property: { portfolioId: { in: portfoliosChangeMe } },
      });

      can(Action.Read, ['Portfolio'], {
        id: { in: portfoliosChangeMe },
      });
    }

    // ### Role: Tenant###
    if (tenants.length > 0) {
      // fail fast if no tenants

      // can view all their tenant profiles
      can(Action.Read, 'Tenant', {
        id: { in: tenants },
      });

      // can view all their leases
      can(Action.Read, ['Lease'], {
        tenantId: { in: tenants },
      });

      can(Action.Read, ['MaintenanceOrder'], {
        tenantId: { in: tenants },
      });

      // TODO some fields should be public
      can(Action.Read, ['LeaseInvoice'], {
        lease: {
          tenantId: { in: tenants },
        },
      });

      // only some fields
      // can(Action.Read, ['Property'], {
      //   units: { some: { leases: { some: { tenantId: { in: tenants } } } } },
      // });

      // only some fields
      // can(Action.Read, ['Unit'], {
      //   leases: { some: { tenantId: { in: tenants } } },
      // });
    }

    console.timeEnd('defineAbility');
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

type AppAbility = PrismaAbility<[string, Subject]>;

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
