type AuthConfigKeys =
	| 'AUTH0_CLIENT_ID'
	| 'AUTH0_CLIENT_SECRET'
	| 'AUTH0_DOMAIN'
	| 'AUTH0_REDIRECT_URI'
	| 'AUTH0_API_NAMESPACE'
	| 'AUTH0_API_AUDIENCE';

export type AuthConfigType = {
	[key in AuthConfigKeys]: string;
};

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

export type Authz = Admin | Owner | Tenant;
