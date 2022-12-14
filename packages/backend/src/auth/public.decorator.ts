import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const SKIP_ROLE_GUARD_KEY = 'skipRoleGuard';

/**
 * Decorator to mark a route as public.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Decorator to skip role guard.
 * The user at this point is of type `AuthenticatedUser`
 *
 */
export const SkipRoleGuard = () => SetMetadata(SKIP_ROLE_GUARD_KEY, true);
