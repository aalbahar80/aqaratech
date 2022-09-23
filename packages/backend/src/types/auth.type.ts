type AuthConfigKeys =
	| 'AUTH0_DOMAIN'
	| 'AUTH0_API_NAMESPACE'
	| 'AUTH0_API_AUDIENCE';

export type AuthConfigType = {
	[key in AuthConfigKeys]: string;
};
