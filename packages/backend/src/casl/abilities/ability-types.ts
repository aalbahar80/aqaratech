import { AbilityBuilder } from '@casl/ability';
import { PrismaAbility, Subjects } from '@casl/prisma';
import {
	Expense,
	Lease,
	LeaseInvoice,
	MaintenanceOrder,
	Organization,
	Payout,
	Plan,
	PlanInvoice,
	Portfolio,
	Property,
	Role,
	Tenant,
	Unit,
	User,
} from '@prisma/client';

export type TAppAbility = PrismaAbility<[string, 'all' | Subject]>;

// type withoutAbstract<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
// type P<T> = withoutAbstract<Partial<T>>;
type P<T> = Partial<T>;
// type P<T> = T;
export type Subject = Subjects<{
	Expense: P<Expense>;
	Lease: P<Lease>;
	MaintenanceOrder: P<MaintenanceOrder>;
	Organization: P<Organization>;
	Payout: P<Payout>;
	Plan: P<Plan>;
	PlanInvoice: P<PlanInvoice>;
	Portfolio: P<Portfolio>;
	Property: P<Property>;
	Role: P<Role>;
	Tenant: Partial<Tenant>;
	LeaseInvoice: P<LeaseInvoice>;
	Unit: P<Unit>;
	User: P<User>;
	File: {
		organizationId: string;
	};
}>;

// Can type exported for use in dependent ability classes.
type TAbilityBuilder = AbilityBuilder<TAppAbility>;
export type TCan = TAbilityBuilder['can'];
export type TCannot = TAbilityBuilder['cannot'];
