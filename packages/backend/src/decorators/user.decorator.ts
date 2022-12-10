import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { IUser } from 'src/interfaces/user.interface';

/**
 * Should *not* be used with the following decorators:
 *
 * `@SkipRouteGuard()`
 * `@SkipAbilityCheck()`
 * `@Public()`.
 */
export const User = createParamDecorator(
	(_data: unknown, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>();

		if (!request.user) {
			// In a public route, both jwt.guard/strategy and abilities.guard are bypassed, so request.user is undefined.
			throw new Error('Tried to use User decorator in a public route.');
		}

		if (!('ability' in request.user)) {
			// This decorator should only be used in routes that require authorization.
			throw new Error('Ability property not found in request.user.');
		}

		return request.user as unknown as IUser;
	},
);
