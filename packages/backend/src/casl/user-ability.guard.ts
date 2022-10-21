import {
	CACHE_MANAGER,
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable,
	InternalServerErrorException,
	LoggerService,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { z } from 'zod';

/**
 * Not really a "guard". Just adds the user's abilities to the request.user object.
 */
@Injectable()
export class UserAbilityGuard implements CanActivate {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly reflector: Reflector,
		private readonly caslAbilityFactory: CaslAbilityFactory,
		private readonly usersService: UsersService,
		@Inject(WINSTON_MODULE_NEST_PROVIDER)
		private readonly logger: LoggerService,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<IRequest>();

		// Get user

		if (!request.user) {
			// Can't add abilities if there is no user.
			return true;
		}

		// Get Role

		const cookiesSchema = z.object({
			role: z.string().optional(),
		});

		const cookies = cookiesSchema.parse(request.cookies);

		const xRoleId = cookies.role;

		const authenticatedUser = request.user; // safe to use email because it is set by jwt.strategy from accessToken

		if (!xRoleId) {
			// Can't add abilities if there is no role.
			return true;
		}

		// Get the cached user/role.
		// Caching ttl should be configured based on whether a role can be updated (ex. Permissions field).
		const userCacheKey = `${authenticatedUser.email}:${xRoleId}`;
		const cached = await this.cacheManager.get<IUser>(userCacheKey);

		let user: IUser;

		if (cached) {
			this.logger.debug!(
				`CACHE HIT: User ${request.user.email} - RoleId: ${xRoleId}`,
			);

			user = cached;
		} else {
			this.logger.debug!(
				`CACHE MISS: User ${request.user.email} - RoleId: ${xRoleId}`,
			);

			const [validatedUser, ability] = await Promise.all([
				this.usersService.findOneByEmail(authenticatedUser.email),
				this.caslAbilityFactory.defineAbility({
					email: authenticatedUser.email,
					xRoleId,
				}),
			]);

			const role = validatedUser.roles.find((r) => r.id === xRoleId);
			if (!role) {
				this.logger.error(
					`Role ${xRoleId} not found for user ${authenticatedUser.email}`,
				);
				throw new InternalServerErrorException();
			}

			user = {
				...validatedUser,
				ability,
				xRoleId,
				role,
				isAqaratechStaff: false,
			};

			// TODO handle cache ttl/invalidation
			// TODO use cache key variable
			await this.cacheManager.set(userCacheKey, user, {
				ttl: 60 * 60 * 24, // TODO adjust
			});
		}

		// TODO add event listener to invalidate all cache entries whenever resource is created/updated
		// https://docs.nestjs.com/techniques/events

		// attach ability to request, to be used by services for any further permission checks
		// TODO spreading here works ok for nested object?
		request.user = {
			...request.user,
			...user,
			ability: user.ability,
			xRoleId,
			isAqaratechStaff: false,
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
