import {
	createParamDecorator,
	ExecutionContext,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';

/**
 * For use in routes marked with `@SkipAbilityCheck()`,
 * when we only care if the user is authenticated or not
 * and no authorization checks are performed.
 *
 * One use-case for this decorator is for new users who just signed up in auth0,
 * but haven't yet been added to our database.
 */
export const UserBasic = createParamDecorator(
	(data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<IncomingRequest>();
		const logger = new Logger('UserBasic');

		logger.debug(`User email: ${request.user?.email}`);

		if (!request.user) {
			// In a public route, both jwt.guard/strategy and abilities.guard are bypassed, so request.user is undefined.
			// Therefore, either don't use this decorator in public routes, or try to get the user in a different way.

			logger.error(
				"User not found in request. This decorator shouldn't be used in public routes.",
			);
			throw new InternalServerErrorException();
		}

		if ('ability' in request.user) {
			logger.warn(
				'Ability property found in request.user. Did you mean to use `User` decorator instead of `UserBasic`?',
			);
		}

		return request.user;
	},
);

/**
 * User could be undefined if we use this decorator in a public route.
 */
interface IncomingRequest extends Request {
	user?: AuthenticatedUser | IUser | undefined;
}
