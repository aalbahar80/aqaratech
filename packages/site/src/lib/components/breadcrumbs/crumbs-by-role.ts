import * as R from 'remeda';

import type { BreadcrumbsDto, RoleDto } from '$api/openapi';

export type Crumbs = Partial<BreadcrumbsDto> | undefined;

/**
 * Filter breadcrumbs according to roleType.
 */
export const crumbsByRole = (
	crumbs: Crumbs,
	role: RoleDto['roleType'] | undefined,
) => {
	if (!crumbs) {
		return {};
	} else if (role === 'PORTFOLIO') {
		return R.omit(crumbs, ['portfolio']);
	} else if (role === 'TENANT') {
		return R.pick(crumbs, ['lease']);
	} else {
		return crumbs;
	}
};

/**
 * Remove undefined values from breadcrumbs.
 */
export const flushCrumbs = (crumbs: Partial<BreadcrumbsDto>) => {
	const flushed = R.pickBy(crumbs, (value) => value !== undefined);

	return flushed;
};

export const handleCrumbs = (
	crumbs: Crumbs,
	role: RoleDto['roleType'] | undefined,
) => {
	const handled = crumbs
		? R.pipe(crumbs, (c) => crumbsByRole(c, role), flushCrumbs, R.toPairs)
		: [];

	return handled;
};
