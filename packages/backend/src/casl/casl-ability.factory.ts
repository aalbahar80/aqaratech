import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import {
  Expense,
  File,
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
import { OrgAdminAbility } from 'src/casl/abilities/org-admin-ability';
import { PortfolioAbility } from 'src/casl/abilities/portfolio-ability';
import { TenantAbility } from 'src/casl/abilities/tenant-ability';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CaslAbilityFactory {
  constructor(
    private prisma: PrismaService,
    private orgAdminAbility: OrgAdminAbility,
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

    if (role.roleType === 'ORGADMIN') {
      await this.orgAdminAbility.define(role, can);
    } else if (role.roleType === 'PORTFOLIO' && role.portfolioId) {
      await this.portfolioAbility.define(role, can);
    } else if (role.roleType === 'TENANT' && role.tenantId) {
      await this.tenantAbility.define(role, can);
    }

    this.logger.log( `Defined manageable entities for role ${role.id} in ${ Date.now() - now }ms`,); // prettier-ignore

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
  File: P<File>;
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
  files: Resource[];
}
