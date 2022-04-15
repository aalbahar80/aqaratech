import { validateAccessToken } from '$lib/server/utils';

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
): Promise<Authz | null> => {
	if (!token) {
		return null;
	}
	const payload = await validateAccessToken(token);
	const roles = payload['https://letand.be/roles'] as string[];
	const metadata = {
		userMetadata: payload[
			'https://letand.be/userMetadata'
		] as Auth0UserMeta['userMetadata'],
	};
	// let authz: Authz;
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
