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

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		private readonly reflector: Reflector,
		private readonly usersService: UsersService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		this.logger.log('🔍 RoleGuard execution started', RoleGuard.name);
		const request = context.switchToHttp().getRequest<IRequest>();

		// Log incoming request details
		this.logger.log(
			`🛑 Incoming request: ${request.method} ${request.url}`,
			RoleGuard.name,
		);

		// Check if route is public
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass(),
		]);

		if (isPublic) {
			this.logger.log('✅ Public route, skipping RoleGuard', RoleGuard.name);
			return true;
		}

		// Check if role guard should be skipped
		const skipRoleGuard = this.reflector.getAllAndOverride<boolean>(
			SKIP_ROLE_GUARD_KEY,
			[context.getHandler(), context.getClass()],
		);

		if (skipRoleGuard) {
			this.logger.log('⚠️ RoleGuard skipped for this route', RoleGuard.name);
			return true;
		}

		// Check if request has user
		if (!request.user) {
			this.logger.warn('🚨 No user found in request', RoleGuard.name);
			return false;
		}

		// Extract role from cookies
		const cookiesSchema = z.object({
			role: z.string().optional(),
		});

		const cookies = cookiesSchema.parse(request.cookies);

		// ✅ FIXED: Declare `authenticatedUser` BEFORE using it
		const authenticatedUser = request.user;

		// ✅ FIXED: Use optional chaining (`?.`) to avoid undefined crashes
		this.logger.log(
			`👤 Authenticated user email: ${authenticatedUser?.email ?? 'Unknown'}`,
			RoleGuard.name,
		);

		const roleId = cookies.role;

		// ✅ FIXED: Removed `{ level: 'warn' }` since Winston already assigns log levels
		this.logger.warn(
			`🔍 RoleGuard Debugging - Checking roleId:
			 User Email: ${authenticatedUser?.email ?? 'Unknown'}
			 Role ID Received: ${roleId ?? 'None'}
			 Cookies Received: ${JSON.stringify(request.cookies)}`,
			RoleGuard.name,
		);

		this.logger.log(`🍪 Extracted roleId from cookies: ${roleId}`, RoleGuard.name);

		// If no roleId, reject request
		if (!roleId) {
			this.logger.warn('🚨 No roleId found in request', RoleGuard.name);
			return false;
		}

		// Find user in the database
		const user = await this.usersService.findOneByEmail(authenticatedUser.email);
		if (!user) {
			this.logger.warn(
				`🚨 No user found with email: ${authenticatedUser.email}`,
				RoleGuard.name,
			);
			return false;
		}

		// Check if user has the role
		const role = user.roles.find((r) => r.id === roleId);
		if (!role) {
			this.logger.warn(
				`🚨 User does not have role with roleId: ${roleId}`,
				RoleGuard.name,
			);
			return false;
		}

		// Fetch ability for the role
		const ability = await this.usersService.getAbility(user.email, role.id);
		this.logger.log(
			`✅ Role verified: ${role.id} | Ability granted`,
			RoleGuard.name,
		);

		// Attach role and ability to request
		const authorizedUser = {
			...request.user,
			ability,
			role,
			id: user.id,
			fullName: user.fullName,
			phone: user.phone,
			isPhoneVerified: user.isPhoneVerified,
		} satisfies IUser;

		request.user = authorizedUser;

		this.logger.log('✅ User authorized successfully', RoleGuard.name);
		return true;
	}
}

/**
 * As received from jwt.strategy
 */
interface IRequest extends Request {
	user: AuthenticatedUser | undefined;
}