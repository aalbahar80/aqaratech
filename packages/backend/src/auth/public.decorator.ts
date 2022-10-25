import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const SKIP_ABILITY_CHECK_KEY = 'skipAbilityCheck';
export const SKIP_ROLE_GUARD_KEY = 'skipRoleGuard';

/**
 * Decorator to mark a route as public.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Decorator to skip ability check.
 * For requests that need to be authenticated, but don't need to be authorized by casl.
 * The user at this point is of type `AuthenticatedUser` (only has email and isAqaratechStaff).
 *
 * Also used for routes that are being migrated to new AuthzGuard
 *
 */
export const SkipAbilityCheck = () => SetMetadata(SKIP_ABILITY_CHECK_KEY, true);

/**
 * Decorator to skip role guard.
 * The user at this point is of type `AuthenticatedUser`
 *
 */
export const SkipRoleGuard = () => SetMetadata(SKIP_ROLE_GUARD_KEY, true);
