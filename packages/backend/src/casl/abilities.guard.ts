import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CHECK_ABILITY, RequiredRule } from 'src/casl/abilities.decorator';
import { IUser } from 'src/interfaces/user.interface';

/**
 *
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	// eslint-disable-next-line @typescript-eslint/require-await
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<Request>();

		const user = request.user as IUser;

		const rules =
			this.reflector.get<RequiredRule[] | undefined>(
				CHECK_ABILITY,
				context.getHandler(),
			) ?? [];

		/**
		 * `isAllowed` here refers to the rule defined in the guard decorator.
		 *
		 */

		const canProceed = rules.every((rule) => {
			const isAllowed = user.ability.can(rule.action, rule.subject);

			if (!isAllowed) {
				this.logger.error(
					{
						level: 'error',
						message: 'Rule failed',
						action: rule.action,
						subject: rule.subject,
					},
					AbilitiesGuard.name,
				);
			}

			return isAllowed;
		});

		if (canProceed) {
			return true;
		}

		return false;
	}
}
