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
import { z } from 'zod';

import { IS_PUBLIC_KEY, SKIP_ROLE_GUARD_KEY } from 'src/auth/public.decorator';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

/**
 *
 * This guard:
 * 1. Checks for a valid roleId
 * 2. Adds role to request.user
 * 3. Adds ability to request.user
 *
 */
@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly usersService: UsersService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		const skipRoleGuard = this.reflector.getAllAndOverride<boolean>(
			SKIP_ROLE_GUARD_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (isPublic || skipRoleGuard) {
			return true;
		}

		const request = context.switchToHttp().getRequest<IRequest>();

		if (!request.user) {
			this.logger.warn(
				{
					level: 'warn',
					message: 'No user found in request',
				},
				RoleGuard.name,
			);

			return false;
		}

		// Get Role

		const cookiesSchema = z.object({
			role: z.string().optional(),
		});

		const cookies = cookiesSchema.parse(request.cookies);

		const roleId = cookies.role;

		const authenticatedUser = request.user; // safe to use email because it is set by jwt.strategy from accessToken

		if (!roleId) {
			// Can't add abilities if there is no role.

			this.logger.warn(
				{
					level: 'warn',
					message: 'No roleId found in request',
				},
				RoleGuard.name,
			);

			return false;
		}

		const user = await this.usersService.findOneByEmail(
			authenticatedUser.email,
		);

		const role = user.roles.find((r) => r.id === roleId);

		if (!role) {
			this.logger.warn(
				{
					level: 'warn',
					message: `User does not have role with roleId ${roleId}`,
				},
				RoleGuard.name,
			);

			return false;
		}

		const ability = await this.usersService.getAbility(user.email, role.id);

		// attach ability & roleId to request
		// TODO spreading here works ok for nested object?
		const authorizedUser = {
			...request.user,
			ability,
			role,
			id: user.id,
			fullName: user.fullName,
		} satisfies IUser;

		request.user = authorizedUser;

		return true;
	}
}

/**
 * As received from jwt.strategy
 */
interface IRequest extends Request {
	user: AuthenticatedUser | undefined;
}
