import type { ValidatedUserDto } from '@self/sdk';
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

interface BaseRole {
	roleId: string;
	home: string;
	roleLabel: string;
}

// Rename: add User suffix
interface Admin extends BaseRole {
	isAdmin: true;
	isOwner: false;
	isTenant: false;
	orgId: string;
	roleName: 'OrgUser';
}

interface Owner extends BaseRole {
	isAdmin: false;
	isOwner: true;
	isTenant: false;
	orgId: null;
	roleName: 'PortfolioUser';
}

interface Tenant extends BaseRole {
	isAdmin: false;
	isOwner: false;
	isTenant: true;
	orgId: null;
	roleName: 'TenantUser';
}

export type Authz = Admin | Owner | Tenant;
export type User = ValidatedUserDto & {
	role: Authz;
	currentRole: ValidatedUserDto['roles'][number];
};
