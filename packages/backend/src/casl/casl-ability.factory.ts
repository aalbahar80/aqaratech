import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { TAppAbility } from 'src/casl/abilities/ability-types';
import { defineOrgAdminAbility } from 'src/casl/abilities/org-admin-ability';
import { definePortfolioAbility } from 'src/casl/abilities/portfolio-ability';
import { defineTenantAbility } from 'src/casl/abilities/tenant-ability';
import { Action } from 'src/casl/action.enum';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CaslAbilityFactory {
	constructor(private readonly prisma: PrismaService) {}

	private readonly logger = new Logger(CaslAbilityFactory.name);

	/**
	 * Creates a CASL ability for a given role. Does so by querying the database for
	 * id's of all the objects that the role has access to.
	 * Then, creates the ability using the id's.
	 */
	async defineAbility({ email, roleId }: { email: string; roleId: string }) {
		const now = Date.now();

		const AppAbility = PrismaAbility as AbilityClass<TAppAbility>;
		const { can, cannot, build } = new AbilityBuilder(AppAbility);

		// We use email (NOT roleId) to find the user/role info.
		// Email is verified by Auth0/jwt, so it's safe to use.
		const user = await this.prisma.user.findUniqueOrThrow({
			where: { email },
			include: { roles: true },
		});

		// Get the specific role that the user is using.
		const role = user.roles.find((role) => role.id === roleId);

		if (!role) {
			throw new Error(`Role not found`, {
				cause: `Role ${roleId} not found for user ${email}`,
			});
		}

		// ### DEFINE ABILITY ###

		can(Action.Read, ['User'], { id: { equals: user.id } });

		if (role.roleType === 'ORGADMIN') {
			defineOrgAdminAbility(role, can, cannot);
		} else if (role.roleType === 'PORTFOLIO' && role.portfolioId) {
			definePortfolioAbility(role, can);
		} else if (role.roleType === 'TENANT' && role.tenantId) {
			defineTenantAbility(role, can);
		}

		this.logger.debug( `Defined manageable entities for role ${role.id} in ${ Date.now() - now }ms`,); // prettier-ignore

		return build();
	}
}
