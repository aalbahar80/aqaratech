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

    can(Action.Read, 'Tenant');
    // cannot(Action.Read, TenantDto, { residencyNum: '2' });

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
