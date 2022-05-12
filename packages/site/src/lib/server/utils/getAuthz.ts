import { environment } from '$environment';
import type { Authz } from '$lib/models/types/auth.type';
import { validateAccessToken } from '$lib/server/utils';

const { authConfig } = environment;

export const getAuthz = async (
	token: string | undefined,
	tokenType: 'idToken' | 'accessToken' = 'accessToken',
): Promise<Authz | null> => {
	if (!token) {
		return null;
	}
	try {
		const payload = await validateAccessToken(token, tokenType);
		const roles = payload[
			`https://${authConfig.AUTH0_API_NAMESPACE}/roles`
		] as string[];

		const isOwner = roles.includes('property-owner');
		const isAdmin = roles.includes('admin');
		const isTenant = roles.includes('tenant');
		const sub = payload.sub || '';
		if (isTenant) {
			const { id } = await prismaClient.tenant.findFirst({
				where: { auth0Id: sub },
				rejectOnNotFound: true,
			});
			return {
				role: 'tenant',
				isAdmin: false,
				isOwner: false,
				isTenant: true,
				id,
				sub,
			};
		} else if (isOwner) {
			const { id } = await prismaClient.client.findFirst({
				where: { auth0Id: sub },
				rejectOnNotFound: true,
			});
			return {
				role: 'property-owner',
				isAdmin: false,
				isOwner: true,
				isTenant: false,
				id,
				sub,
			};
		} else if (isAdmin) {
			return {
				role: 'admin',
				isAdmin: true,
				isOwner: false,
				isTenant: false,
				id: undefined,
				sub,
			};
		} else {
			return null;
		}
	} catch (e) {
		console.error(e);
		return null;
	}
};

export const getUser = async (
	token: string | undefined,
): Promise<App.Session['user']> => {
	if (!token) {
		return;
	}
	try {
		const payload = await validateAccessToken(token, 'idToken');
		const email = payload.email as string;
		const name = payload.name as string;
		const updatedAt = payload.updated_at as string;

		const user = {
			sub: payload.sub,
			email,
			name,
			updatedAt,
		};
		return user;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};
