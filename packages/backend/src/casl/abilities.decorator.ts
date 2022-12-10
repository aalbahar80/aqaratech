import { SetMetadata } from '@nestjs/common';

import { SubjectName } from 'src/casl/abilities/ability-types';
import { Action } from 'src/casl/action.enum';

export interface RequiredRule {
	action: Action;

	subject: SubjectName;

	/**
	 * If true, url params will be used to construct the subject object before checking abilities.
	 * Useful for guarding POST requests.
	 */
	useParams?: boolean;

	/**
	 * URL param key overrides
	 */
	overrideParams?: Record<string, string>;
}
export const CHECK_ABILITY = 'check_ability';

/**
 * Decorator to set metadata for authz permission check.
 * The metadata will be consumed by an ability guard.
 */
export const CheckAbilities = (...requirements: RequiredRule[]) =>
	SetMetadata(CHECK_ABILITY, requirements);
