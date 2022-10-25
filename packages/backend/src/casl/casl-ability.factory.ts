import { AbilityBuilder, AbilityClass } from '@casl/ability';
import { PrismaAbility } from '@casl/prisma';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
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
	public defineAbility = async ({
		email,
		roleId,
	}: {
		email: string;
		roleId?: string;
	}) => {
		const now = Date.now();

		const AppAbility = PrismaAbility as AbilityClass<TAppAbility>;
		const ability = new AbilityBuilder(AppAbility);

		// We use email (NOT roleId) to find the user/role info.
		// Email is verified by Auth0/jwt, so it's safe to use.
		const user = await this.prisma.user.findUniqueOrThrow({
			where: { email },
			include: { roles: true },
		});

		// Once we retrieve the user, we can then use the xRoleId header to select their desired role.
		const role = user.roles.find((role) => role.id === roleId);
		if (!role) {
			this.logger.log(user);
			// Log the userId for our own reference.
			// But don't return it in the error message as it is priviliged info.
			this.logger.error(
				`Could not resolve roleId ${roleId ?? 'undefined'} for userId: ${
					user.id
				}`,
			);
			throw new ForbiddenException('Role not found');
		}

		// ### DEFINE ABILITY ###

		ability.can(Action.Read, ['User'], { id: { equals: user.id } });

		if (role.roleType === 'ORGADMIN') {
			defineOrgAdminAbility(role, ability.can, ability.cannot);
		} else if (role.roleType === 'PORTFOLIO' && role.portfolioId) {
			definePortfolioAbility(role, ability.can);
		} else if (role.roleType === 'TENANT' && role.tenantId) {
			defineTenantAbility(role, ability.can);
		}

		this.logger.debug( `Defined manageable entities for role ${role.id} in ${ Date.now() - now }ms`,); // prettier-ignore

		return ability.build();
	};
}
