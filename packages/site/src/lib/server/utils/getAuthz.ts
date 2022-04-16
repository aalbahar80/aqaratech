import { environment } from '$environment';
import { validateAccessToken } from '$lib/server/utils';

const { authConfig } = environment;
interface Admin {
	isAdmin: true;
	isOwner: false;
	isTenant: false;
	id: undefined;
}

interface Owner {
	isAdmin: false;
	isOwner: true;
	isTenant: false;
	id: string;
}

interface Tenant {
	isAdmin: false;
	isOwner: false;
	isTenant: true;
	id: string;
}

type Authz = Admin | Owner | Tenant;

interface Auth0UserMeta {
	userMetadata: {
		idInternal: string;
	};
}

export const getAuthz = async (
	token: string | undefined,
	tokenType: 'idToken' | 'accessToken' = 'accessToken',
): Promise<Authz | null> => {
	if (!token) {
		return null;
	}
	console.log({ token }, 'getAuthz.ts ~ 41');
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
	// let authz;
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
		throw new Error('Invalid access token');
	}
};
