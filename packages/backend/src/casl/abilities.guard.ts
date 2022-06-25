import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/auth/public.decorator';
import { CHECK_ABILITY, RequiredRule } from 'src/casl/abilities.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { TRequest } from 'src/types/request.type';

/**
 * Decorator to check authz permissions. Consumes metadata from `@CheckAbilities`.
 * This decorator is used to check permissions for a specific action on an entity type,
 * not an entity instance. This makes it useful for failing fast if a user is not authorized.
 *
 * For example, if a user is only allowed to read a `Unit` in his organization, we need to retrieve
 * the `Unit` from the database, then check if it's in the user's organization.
 *
 * On the other hand, if a user does not have permission to read any `Unit`,
 * we can just fail fast and return a 403 without needing to call the db.
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

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

    const request = context.switchToHttp().getRequest<TRequest>();
    const user = request?.user;

    if (!user) {
      return false;
    }

    const ability = await this.caslAbilityFactory.defineAbility(user);

    const isAllowed = rules.every((rule) => {
      return ability.can(rule.action, rule.subject);
    });

    return isAllowed;
  }
}
