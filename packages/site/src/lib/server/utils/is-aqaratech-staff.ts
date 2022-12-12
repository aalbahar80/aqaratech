import { AQARATECH_STAFF_ROLE } from '@self/utils';

import { authConfig } from '$lib/server/config/auth';

export const isAqaratechStaff = (payload: Record<string, any>) => {
	const auth0Roles = payload[
		`${authConfig.AUTH0_API_NAMESPACE}/roles`
	] as unknown as string[];

	const isAqaratechStaff = auth0Roles.includes(AQARATECH_STAFF_ROLE);

	return isAqaratechStaff;
};
