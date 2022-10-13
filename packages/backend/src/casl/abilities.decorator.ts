import { SetMetadata } from '@nestjs/common';
import { Subject } from 'src/casl/abilities/ability-types';
import { Action } from 'src/casl/action.enum';

export interface RequiredRule {
	action: Action;
	subject: Subject;
}
export const CHECK_ABILITY = 'check_ability';

/**
 * Decorator to set metadata for authz permission check.
 * The metadata will be consumed by an ability guard.
 */
export const CheckAbilities = (...requirements: RequiredRule[]) =>
	SetMetadata(CHECK_ABILITY, requirements);
