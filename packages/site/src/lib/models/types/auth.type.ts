import type { ValidatedRoleDto, ValidatedUserDto } from '$api/openapi';
import type { JSONWebKeySet } from 'jose';

type AuthConfigKeys =
	| 'AUTH0_CLIENT_ID'
	| 'AUTH0_CLIENT_SECRET'
	| 'AUTH0_DOMAIN'
	| 'AUTH0_DEFAULT_DOMAIN'
	| 'AUTH0_REDIRECT_URI'
	| 'AUTH0_API_NAMESPACE'
	| 'AUTH0_API_AUDIENCE';

/**
 *  `AUTH0_API_NAMESPACE` is configured in Auth0 (login) action
 */
export type AuthConfigType = {
	[key in AuthConfigKeys]: string;
} & {
	JWKS: JSONWebKeySet;
};

export interface UserMeta {
	home: string;
	roleLabel: string;
}

export type RoleSK = ValidatedRoleDto & {
	meta: UserMeta;
};

export type User = Omit<ValidatedUserDto, 'roles'> & {
	roles: RoleSK[];
	role: RoleSK | undefined;
};

export type UserWithRole = Omit<User, 'role'> & {
	role: RoleSK;
};
