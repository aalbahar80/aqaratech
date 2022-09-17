import { authConfig } from '$lib/environment/auth';
import { AQARATECH_STAFF_ROLE } from '@self/utils';

export const isAqaratechStaff = (payload: Record<string, any>) => {
	const auth0Roles = payload[
		`${authConfig.AUTH0_API_NAMESPACE}/roles`
	] as unknown as string[];

	const isAqaratechStaff = auth0Roles.includes(AQARATECH_STAFF_ROLE);

	return isAqaratechStaff;
};
