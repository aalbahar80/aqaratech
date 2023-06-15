import { accessibleBy } from '@casl/prisma';
import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Inject,
	LoggerService,
} from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

/** The aggregate controller returns data that is either scoped to the
 * organization or the portfolio. This guard ensures that for PORTFOLIO roles
 * the portfolioId is present in the query string and that the user has access
 * to that portfolio. */
@Injectable()
export class AggregateGuard implements CanActivate {
	constructor(
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
		private readonly prisma: PrismaService,
	) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const request = ctx.switchToHttp().getRequest<Request>();
		const user = request.user as IUser;

		// if user is not orgadmin or portfolio, return false
		if (!['ORGADMIN', 'PORTFOLIO'].includes(user.role.roleType)) {
			this.logger.debug?.(
				'User is not org admin or portfolio',
				AggregateGuard.name,
			);
			return false;
		}

		const portfolioId = request.query['portfolioId'];
		const hasPortfolioId = portfolioId && typeof portfolioId === 'string';

		if (user.role.roleType === 'PORTFOLIO' && !hasPortfolioId) {
			this.logger.debug?.(
				'User has role PORTFOLIO and portfolioId is not present. Denying access',
				AggregateGuard.name,
			);
			return false;
		}

		if (hasPortfolioId) {
			try {
				await this.prisma.c.portfolio.findUniqueOrThrow({
					where: {
						id: portfolioId,
						AND: accessibleBy(user.ability, Action.Read).Portfolio,
					},
				});
				// grant access if user can read portfolio
				return true;
			} catch (e) {
				this.logger.debug?.(
					'User does not have access to portfolio. Denying access',
					AggregateGuard.name,
				);
				return false;
			}
		} else {
			this.logger.debug?.('PortfolioId not provided', AggregateGuard.name);
			if (user.role.roleType === 'ORGADMIN') {
				this.logger.debug?.('User role is ORGADMIN. Granting access');
				return true;
			}
			this.logger.debug?.('User role is PORTFOLIO. Denying access');
			return false;
		}
	}
}
