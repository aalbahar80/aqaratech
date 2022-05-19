import type { JSONWebKeySet } from 'jose';

type AuthConfigKeys =
	| 'AUTH0_CLIENT_ID'
	| 'AUTH0_CLIENT_SECRET'
	| 'AUTH0_DOMAIN'
	| 'AUTH0_DEFAULT_DOMAIN'
	| 'AUTH0_REDIRECT_URI'
	| 'AUTH0_API_NAMESPACE'
	| 'AUTH0_API_AUDIENCE'
	| 'AUTH0_ROLE_ID_PROPERTY_OWNER'
	| 'AUTH0_ROLE_ID_TENANT';

export type AuthConfigType = {
	[key in AuthConfigKeys]: string;
} & {
	JWKS: JSONWebKeySet;
};

interface Admin {
	role: 'admin';
	isAdmin: true;
	isOwner: false;
	isTenant: false;
	id: undefined;
	sub: string | undefined;
}

interface Owner {
	role: 'property-owner';
	isAdmin: false;
	isOwner: true;
	isTenant: false;
	id: string;
	sub: string | undefined;
}

interface Tenant {
	role: 'tenant';
	isAdmin: false;
	isOwner: false;
	isTenant: true;
	id: string;
	sub: string | undefined;
}

export type Authz = Admin | Owner | Tenant;
