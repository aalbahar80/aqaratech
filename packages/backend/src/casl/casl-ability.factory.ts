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

type AppAbility = PrismaAbility<
  [
    string,
    Subjects<{
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
    }>,
  ]
>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: UserDto) {
    const AppAbility = PrismaAbility as AbilityClass<AppAbility>;
    const { can, cannot, build } = new AbilityBuilder(AppAbility);

    console.log(user.roles);

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

    // users can manage tenants in their org
    can(Action.Manage, 'Tenant', {
      organizationId: { in: orgs },
    });
    // can(Action.Read, 'Tenant', { residencyNum: { equals: '1' } }).because(
    //   "he's the chosen one",
    // );
    return build();
  }
}

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
