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
 * Guard to check authz permissions. Consumes metadata from `@CheckAbilities`.
 * This decorator is used to check permissions for a specific action on an entity type,
 * not an entity instance. This makes it useful for failing fast if a user is not authorized.
 *
 * For example, if a user is only allowed to read a `Unit` in his organization, we need to retrieve
 * the `Unit` from the database, then check if it's in the user's organization.
 *
 * On the other hand, if a user does not have permission to read any `Unit`,
 * we can just fail fast and return a 403 without needing to call the db.
 *
 * Attach ability to a request. Handle caching of abilities.
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

    const cached = await this.cacheManager.get<AppAbility>(request.user.id);

    let ability: AppAbility;

    if (cached) {
      this.logger.log(`Cache hit: Ability for user ${request.user.email}`);
      ability = cached;
    } else {
      this.logger.log(`Cache miss: Ability for user ${request.user.email}`);
      ability = await this.caslAbilityFactory.defineAbility(request.user);
      // TODO handle cache ttl/invalidation
      await this.cacheManager.set(request.user.id, ability, {
        ttl: 60 * 60 * 24, // TODO adjust
      });
    }

    // attach ability to request, to be used by services for any further permission checks
    request.user.ability = ability;

    const id = request.params.id as string | undefined;

    /**
     * `isAllowed` here refers to the rule defined in the guard decorator.
     * _Not_ to be confused with rules defined in the service.
     *
     * Example:
     * A POST /tenants request goes through more than one permisson check.
     *
     * First, the request is allowed if the user has the ability to create any tenant.
     * This is defined in the guard decorator.
     * When *this* rule fails, the cache is invalidated and one more attempt is made to grant the user permission.
     *
     * Second, the request is allowed if the user has the ability to create this particular tenant subject.
     * This is defined in the service.
     * When *this* rule fails, the cache is not invalidated (as things stand).
     * TODO should this also be invalidated?
     */
    const isAllowed = rules.every((rule) => {
      if (id) {
        this.logger.log({ id }, 'rule.subject.id');
        // TODO fix type
        // @ts-ignore
        return ability.can(rule.action, subject(rule.subject, { id }));
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
      await this.cacheManager.del(request.user.id);

      // try again
      return this.canActivate(context);
    }

    this.logger.log(
      `User ${request.user.email} has been granted preliminary access to ${request.method} ${request.url}`,
    );
    return isAllowed;
  }
}

interface IRequest extends Request {
  user: IUser;
}
