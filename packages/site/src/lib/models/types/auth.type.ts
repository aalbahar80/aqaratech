import type { ValidatedUserDto, ValidatedUserDtoRolesInner } from '@self/sdk';
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

export interface NavbarItem {
	name: string;
	href: string;
}

interface BaseRole {
	home: string;
	roleLabel: string;
	navLinks?: NavbarItem[];
}

// Rename: add User suffix
interface Admin extends BaseRole {
	isAdmin: true;
	isOwner: false;
	isTenant: false;
}

interface Owner extends BaseRole {
	isAdmin: false;
	isOwner: true;
	isTenant: false;
}

interface Tenant extends BaseRole {
	isAdmin: false;
	isOwner: false;
	isTenant: true;
}

export type UserMeta = Admin | Owner | Tenant;
export type RoleSK = ValidatedUserDtoRolesInner & {
	meta: UserMeta;
};
export type User = ValidatedUserDto & {
	roles: RoleSK[];
	role: RoleSK;
};
