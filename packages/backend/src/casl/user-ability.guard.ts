import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	InternalServerErrorException,
	LoggerService,
} from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { z } from 'zod';

/**
 * TODO: Rename to RoleGuard.
 *
 * This guard:
 * 1. Checks for a valid roleId
 * 2. Adds roleId to request.user
 * 3. Adds ability to request.user
 *
 */
@Injectable()
export class UserAbilityGuard implements CanActivate {
	constructor(
		private readonly usersService: UsersService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<IRequest>();

		if (!request.user) {
			this.logger.warn(
				{
					level: 'warn',
					message: 'No user found in request',
				},
				UserAbilityGuard.name,
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
				UserAbilityGuard.name,
			);

			return false;
		}

		const user = await this.usersService.findOneByEmail(
			authenticatedUser.email,
		);

		const role = user.roles.find((r) => r.id === roleId);

		if (!role) {
			this.logger.error(
				`Role ${roleId} not found for user ${authenticatedUser.email}`,
			);

			throw new InternalServerErrorException();
		}

		const ability = await this.usersService.getAbility(user.email, role);

		// attach ability & roleId to request
		// TODO spreading here works ok for nested object?
		request.user = {
			...request.user,
			ability,
			roleId: roleId,
		} as IUser;

		return true;
	}
}

/**
 * As received from jwt.strategy
 */
interface IRequest extends Request {
	user: AuthenticatedUser | undefined;
}
