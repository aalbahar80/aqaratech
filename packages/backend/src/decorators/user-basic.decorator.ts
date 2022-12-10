import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { AuthenticatedUser } from 'src/interfaces/user.interface';

/**
 *
 * TODO: Rename to AuthenticatedUser
 *
 * For use in routes marked with `@SkipAbilityCheck()` or `@SkipRoleGuard()`.
 *
 */
export const UserBasic = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		// return request.user;
		const request = ctx.switchToHttp().getRequest<Request>();

		if (!request.user) {
			// In a public route, jwt.guard is bypassed so request.user will be undefined.
			throw new Error('No user found in request.', {
				cause: `Tried to use ${UserBasic.name} decorator in a public route.`,
			});
		}

		return request.user as AuthenticatedUser;
	},
);
