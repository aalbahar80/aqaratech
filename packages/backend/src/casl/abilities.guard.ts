import { subject } from '@casl/ability';
import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/auth/public.decorator';
import { CHECK_ABILITY, RequiredRule } from 'src/casl/abilities.decorator';
import { AppAbility, CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { IUser } from 'src/interfaces/user.interface';

/**
 * Attaches a role's `ability` to the `request.user` object. Handles caching of abilities.
 * Respects the `@Public` decorator.
 *
 * Also checks authz permissions. Consumes metadata from `@CheckAbilities`.
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
  ) {}

  private readonly logger = new Logger(AbilitiesGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // TODO: dry up isPublic check with src/auth/JwtAuthGuard
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const request = context.switchToHttp().getRequest<IRequest>();

    // Use `x-role-id` header if it's set. Otherwise fallback to the user's default role.
    const xRoleId = request.headers['x-role-id'] as string | undefined;

    const defaultRoleId =
      request.user.roles.find((role) => role.isDefault)?.id ||
      request.user.roles[0].id;

    const roleId = xRoleId || defaultRoleId;

    // Get the cached ability for this user and role.
    // Caching ttl should be configured based on whether a role can be updated (ex. Permissions field).
    const cached = await this.cacheManager.get<AppAbility>(roleId);

    let ability: AppAbility;

    if (cached) {
      this.logger.log(
        `Cache hit: Ability for user ${request.user.email} - RoleId: ${roleId}`,
      );
      ability = cached;
    } else {
      this.logger.log(
        `Cache miss: Ability for user ${request.user.email} - RoleId: ${roleId}`,
      );
      ability = await this.caslAbilityFactory.defineAbility(request.user);
      // TODO handle cache ttl/invalidation
      await this.cacheManager.set(roleId, ability, {
        ttl: 60 * 60 * 24, // TODO adjust
      });
    }

    // attach ability to request, to be used by services for any further permission checks
    request.user.ability = ability;

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
        return ability.can(
          rule.action,
          // @ts-ignore
          subject(rule.subject, { ...subjectFields }),
        );
      } else {
        return ability.can(rule.action, rule.subject);
      }
    });

    // TODO add event listener to invalidate all cache entries whenever resource is created/updated
    // https://docs.nestjs.com/techniques/events

    // Fallback in case of bad cache
    if (!isAllowed && cached) {
      // prettier-ignore
      this.logger.log('Permission denied in guard. Invalidating cache and reattempting.');
      await this.cacheManager.del(roleId);

      // try again
      // TODO monitor
      return this.canActivate(context);
    }

    this.logger.log(
      `User ${request.user.email} has been granted preliminary access to ${request.method} ${request.url} - RoleId: ${roleId}`,
    );
    return isAllowed;
  }
}

interface IRequest extends Request {
  user: IUser;
}
