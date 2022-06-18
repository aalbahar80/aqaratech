// import type { JSONWebKeySet } from 'jose';

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
  //   JWKS: JSONWebKeySet;
  JWKS: any;
};

interface Admin {
  role: 'admin';
  isAdmin: true;
  isOwner: false;
  isTenant: false;
  id: undefined;
  sub: string | undefined;
  home: string;
}

interface Owner {
  role: 'property-owner';
  isAdmin: false;
  isOwner: true;
  isTenant: false;
  id: string;
  sub: string | undefined;
  home: string;
}

interface Tenant {
  role: 'tenant';
  isAdmin: false;
  isOwner: false;
  isTenant: true;
  id: string;
  sub: string | undefined;
  home: string;
}

export type Authz = Admin | Owner | Tenant;
