import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
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
  Transaction,
  Unit,
  User,
} from '@prisma/client';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: UserDto) {
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, cannot, build } = new AbilityBuilder(AppAbility);

    // opaque id type would be useful here
    const orgs: string[] = [];
    const portfolios: string[] = [];
    const tenants: string[] = [];

    user.roles.forEach((role) => {
      if (role.organizationId) {
        orgs.push(role.organizationId);
      }
      if (role.portfolioId) {
        portfolios.push(role.portfolioId);
      }
      if (role.tenantId) {
        tenants.push(role.tenantId);
      }
    });

    console.log({ orgs });
    console.log({ portfolios });
    console.log({ tenants });

    // ### Role: Organization###
    if (orgs.length > 0) {
      // fail fast if no orgs

      can(Action.Manage, ['Tenant'], {
        organizationId: { in: orgs },
      });

      can(Action.Manage, ['Portfolio'], {
        organizationId: { in: orgs },
      });

      can(Action.Manage, ['Expense'], {
        OR: [
          { portfolio: { organizationId: { in: orgs } } },
          { property: { portfolio: { organizationId: { in: orgs } } } },
          {
            unit: { property: { portfolio: { organizationId: { in: orgs } } } },
          },
        ],
      });

      can(Action.Manage, ['Lease'], {
        unit: { property: { portfolio: { organizationId: { in: orgs } } } },
      });

      can(Action.Manage, ['Property'], {
        portfolio: { organizationId: { in: orgs } },
      });

      can(Action.Manage, ['MaintenanceOrder'], {
        OR: [
          { portfolio: { organizationId: { in: orgs } } },
          { property: { portfolio: { organizationId: { in: orgs } } } },
          {
            unit: { property: { portfolio: { organizationId: { in: orgs } } } },
          },
          { tenant: { organizationId: { in: orgs } } },
          // {expenses: {some: {}}}
        ],
      });

      can(Action.Manage, ['Transaction'], {
        lease: {
          unit: { property: { portfolio: { organizationId: { in: orgs } } } },
        },
      });

      can(Action.Manage, ['Unit'], {
        property: { portfolio: { organizationId: { in: orgs } } },
      });
    }

    // ### Role: Portfolio ###
    if (portfolios.length > 0) {
      // fail fast if no portfolios

      // can view tenants who have leases in their properties
      can(Action.Read, 'Tenant', {
        leases: {
          some: {
            unit: {
              property: {
                portfolioId: { in: portfolios },
              },
            },
          },
        },
      });

      can(Action.Read, ['Expense'], {
        OR: [
          { portfolioId: { in: portfolios } },
          { property: { portfolioId: { in: portfolios } } },
          { unit: { property: { portfolioId: { in: portfolios } } } },
        ],
      });

      can(Action.Read, ['MaintenanceOrder'], {
        OR: [
          { portfolioId: { in: portfolios } },
          { property: { portfolioId: { in: portfolios } } },
          { unit: { property: { portfolioId: { in: portfolios } } } },
        ],
      });

      can(Action.Read, ['Lease'], {
        unit: { property: { portfolioId: { in: portfolios } } },
      });

      can(Action.Read, ['Property'], {
        portfolioId: { in: portfolios },
      });

      can(Action.Read, ['Transaction'], {
        lease: {
          unit: { property: { portfolioId: { in: portfolios } } },
        },
      });

      can(Action.Read, ['Unit'], {
        property: { portfolioId: { in: portfolios } },
      });

      can(Action.Read, ['Portfolio'], {
        id: { in: portfolios },
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
      can(Action.Read, ['Transaction'], {
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

    return build();
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

export type Subject = Subjects<{
  Expense: Expense;
  ExpenseType: ExpenseType;
  Lease: Lease;
  MaintenanceOrder: MaintenanceOrder;
  Organization: Organization;
  Plan: Plan;
  PlanInvoice: PlanInvoice;
  Portfolio: Portfolio;
  Property: Property;
  Role: Role;
  Tenant: Tenant;
  Transaction: Transaction;
  Unit: Unit;
  User: User;
}>;
