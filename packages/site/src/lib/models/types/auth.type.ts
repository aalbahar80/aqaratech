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

export interface UserMeta {
	home: string;
	roleLabel: string;
	navLinks?: NavbarItem[];
}

export type RoleSK = ValidatedUserDtoRolesInner & {
	meta: UserMeta;
};

export type User = ValidatedUserDto & {
	roles: RoleSK[];
	role: RoleSK;
};
