import { SetMetadata } from '@nestjs/common';
import { Action, Subject } from 'src/casl/casl-ability.factory';

export interface RequiredRule {
  action: Action;
  subject: Subject;

  /**
   * @description
   * name of any parameters to be passed to the ability check
   *
   * @default
   * By default, `:id` param is passed to the ability check if it exists,
   * unless `skipParamCheck` is explicitly set to `true`
   */
  params?: string[];

  skipParamCheck?: boolean;
}
export const CHECK_ABILITY = 'check_ability';

/**
 * Decorator to set metadata for authz permission check.
 * The metadata will be consumed by an ability guard.
 */
export const CheckAbilities = (...requirements: RequiredRule[]) =>
  SetMetadata(CHECK_ABILITY, requirements);
