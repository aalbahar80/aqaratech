import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_ABILITY, RequiredRule } from 'src/casl/abilities.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { TRequest } from 'src/types/request.type';

/**
 * Decorator to check authz permissions. Consumes metadata from `@CheckAbilities`.
 */
@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const request = context.switchToHttp().getRequest<TRequest>();
    const user = request?.user;

    if (!user) {
      return false;
    }

    const ability = this.caslAbilityFactory.defineAbility(user);

    const isAllowed = rules.every((rule) => {
      return ability.can(rule.action, rule.subject);
    });

    return isAllowed;
  }
}
