import { environment } from '$lib/environment';
import { AQARATECH_STAFF_ROLE } from '@self/utils';

const {
	authConfig: { AUTH0_API_NAMESPACE },
} = environment;

export const isAqaratechStaff = (payload: Record<string, any>) => {
	const auth0Roles = payload[
		`${AUTH0_API_NAMESPACE}/roles`
	] as unknown as string[];

	const isAqaratechStaff = auth0Roles.includes(AQARATECH_STAFF_ROLE);

	return isAqaratechStaff;
};
