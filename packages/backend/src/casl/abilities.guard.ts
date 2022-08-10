import { subject } from '@casl/ability';
import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import {
  IS_PUBLIC_KEY,
  SKIP_ABILITY_CHECK_KEY,
} from 'src/auth/public.decorator';
import { CHECK_ABILITY, RequiredRule } from 'src/casl/abilities.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ROLE_HEADER } from 'src/constants/header-role';
import { AuthenticatedUser, IUser } from 'src/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

/**
 * Receives a user of type AuthenticatedUser as returned by the jwt.strategy.
 * Uses the user's email to enhance the `request.user` object with additional information,
 * including the calculated abilities.
 * Handles caching of users/abilities.
 *
 * Skipped if either `@Public` or `@SkipAbiltiyCheck` decorators are used. Otherwise,
 * it expects a concrete x-role-id header to be set, and will throw a 403 if not.
 *
 * Once a user's ability is calculated, it is compared againt metadata from `@CheckAbilities` decorator
 * to determine if the user has the required abilities.
 *
 * This decorator is used to check permissions for a specific action on an entity type,
 * not an entity instance. This makes it useful for failing fast if a user is not authorized.
 *
 * For example, if a `role` is only allowed to read a `Unit` in a it's organization, we need to retrieve
 * the `Unit` from the database, then check if it's in the `role`'s organization.
 *
 * On the other hand, if a `role` does not have permission to read any `Unit` at all,
 * we can just fail fast and return a 403 without needing to call the db.
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService,
  ) {}

  private readonly logger = new Logger(AbilitiesGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const skipAbilityCheck = this.reflector.getAllAndOverride<boolean>(
      SKIP_ABILITY_CHECK_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic || skipAbilityCheck) {
      this.logger.debug(
        `Public route, skipping abilities guard. isPublic: ${isPublic}, skipAbilityCheck: ${skipAbilityCheck}`,
      );
      return true;
    }

    this.logger.debug('Enforcing abilities guard');

    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const request = context.switchToHttp().getRequest<IRequest>();
    const xRoleId = request.headers[ROLE_HEADER] as string | undefined;
    const authenticatedUser = request.user; // safe to use email because it is set by jwt.strategy from accessToken

    if (!xRoleId) {
      throw new ForbiddenException('Missing role header');
    }

    // Get the cached user/role.
    // Caching ttl should be configured based on whether a role can be updated (ex. Permissions field).
    const userCacheKey = `${authenticatedUser.email}:${xRoleId}`;
    const cached = await this.cacheManager.get<IUser>(userCacheKey);

    let user: IUser;

    if (cached) {
      this.logger.debug(
        `CACHE HIT: User ${request.user.email} - RoleId: ${xRoleId}`,
      );

      user = cached;
    } else {
      this.logger.debug(
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

      user = { ...validatedUser, ability, xRoleId, role };

      // TODO handle cache ttl/invalidation
      // TODO use cache key variable
      await this.cacheManager.set(userCacheKey, user, {
        ttl: 60 * 60 * 24, // TODO adjust
      });
    }

    const requestHasParams = Object.keys(request.params).length > 0;

    /**
     * `isAllowed` here refers to the rule defined in the guard decorator.
     * _Not_ to be confused with rules defined in the service.
     *
     * Example:
     * A POST /tenants request goes through more than one permisson check.
     *
     * First, the request is allowed if the `role` has the ability to create any tenant.
     * This is defined in the guard decorator.
     * When *this* rule fails, the cache is invalidated and one more attempt is made to grant permission to the request.
     *
     * Second, the request is allowed if the `role` has the ability to create this particular tenant subject.
     * This is defined in the service.
     * When *this* rule fails, the cache is not invalidated (as things stand).
     * TODO should this also be invalidated?
     */
    const isAllowed = rules.every((rule) => {
      if (requestHasParams && !rule.skipParamCheck) {
        const params = rule.params || ['id'];

        // TODO current implementation is misleading. Rename params to idParam. Where the passed in
        // param name should always be mapped to the `id` of the subject.
        //
        // Example: @CheckAbilities(CreateTenant, params: ['orgId']), means that
        // subjectFields = { id: request.params.orgId } // what docs imply as current
        // subjectFields = { orgId: request.params.orgId } // actual current
        const subjectFields: Record<string, any> = {};
        params.forEach((param) => {
          const paramValue = request.params[param];
          if (paramValue) {
            subjectFields[param] = paramValue;
          } else {
            this.logger.warn(
              `param with name ${param} was either not found in request or was falsy`,
            );
          }
        });

        // TODO fix type
        return user.ability.can(
          rule.action,
          // @ts-ignore
          subject(rule.subject, { ...subjectFields }),
        );
      } else {
        return user.ability.can(rule.action, rule.subject);
      }
    });

    // TODO add event listener to invalidate all cache entries whenever resource is created/updated
    // https://docs.nestjs.com/techniques/events

    // Fallback in case of bad cache
    if (!isAllowed && cached) {
      // prettier-ignore
      this.logger.debug('Permission denied in guard. Invalidating cache and reattempting.');

      // TODO sec don't determine role here, do it in frontend. Currently, there's no
      // guarantee the xRoleId we're using in the cache key is the one resolved
      // by casl.defineAbility.
      this.logger.debug(`CACHE BUST: userCacheKey: ${userCacheKey}`);
      await this.cacheManager.del(userCacheKey);

      // try again
      // TODO monitor
      return this.canActivate(context);
    }

    if (isAllowed) {
      this.logger.log(
        `User ${request.user.email} has been granted preliminary access to ${request.method} ${request.url} - RoleId: ${xRoleId}`,
      );
    } else {
      this.logger.log(
        `User ${request.user.email} has been denied access to ${request.method} ${request.url} - RoleId: ${xRoleId}`,
      );
    }

    // attach ability to request, to be used by services for any further permission checks
    // TODO spreading here works ok for nested object?
    request.user = {
      ...request.user,
      ...user,
      ability: user.ability,
      xRoleId,
    } as IUser;

    return isAllowed;
  }
}

/**
 * As received from jwt.strategy
 */
interface IRequest extends Request {
  user: AuthenticatedUser;
}
