import { environment } from '$environment';
import type { Authz } from '$lib/models/types/auth.type';
import { validateAccessToken } from '$lib/server/utils';

const { authConfig } = environment;

interface Auth0UserMeta {
	userMetadata: {
		idInternal: string;
	};
}

export const getAuthz = async (
	token: string,
	tokenType: 'idToken' | 'accessToken' = 'accessToken',
): Promise<Authz | null> => {
	if (!token) {
		return null;
	}
	try {
		const payload = await validateAccessToken(token, tokenType);
		console.log({ payload }, 'getAuthz.ts ~ 43');
		const roles = payload[
			`https://${authConfig.AUTH0_API_NAMESPACE}/roles`
		] as string[];
		console.log({ roles }, 'getAuthz.ts ~ 47');
		const metadata = {
			userMetadata: payload[
				`https://${authConfig.AUTH0_API_NAMESPACE}/userMetadata`
			] as Auth0UserMeta['userMetadata'],
		};

		const isOwner = roles.includes('property-owner');
		const isAdmin = roles.includes('admin');
		const isTenant = roles.includes('tenant');
		if (isTenant) {
			return {
				isAdmin: false,
				isOwner: false,
				isTenant: true,
				id: metadata.userMetadata.idInternal,
			};
		} else if (isOwner) {
			return {
				isAdmin: false,
				isOwner: true,
				isTenant: false,
				id: metadata.userMetadata.idInternal,
			};
		} else if (isAdmin) {
			return {
				isAdmin: true,
				isOwner: false,
				isTenant: false,
				id: undefined,
			};
		} else {
			return null;
		}
	} catch (e) {
		console.error(e);
		return null;
	}
};
