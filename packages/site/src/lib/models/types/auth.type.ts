import type { UserDto } from '@self/sdk';
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

/**
 *  `AUTH0_API_NAMESPACE` is configured in Auth0 (login) action
 */
export type AuthConfigType = {
	[key in AuthConfigKeys]: string;
} & {
	JWKS: JSONWebKeySet;
};

// Rename: add User suffix
interface Admin {
	isAdmin: true;
	isOwner: false;
	isTenant: false;
	roleId: string;
	home: string;
}

interface Owner {
	isAdmin: false;
	isOwner: true;
	isTenant: false;
	roleId: string;
	home: string;
}

interface Tenant {
	isAdmin: false;
	isOwner: false;
	isTenant: true;
	roleId: string;
	home: string;
}

export type Authz = Admin | Owner | Tenant;
export type User = UserDto & { role: Authz };
