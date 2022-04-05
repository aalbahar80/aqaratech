import { SvelteKitAuth } from 'sk-auth';
import type { OAuth2ProviderConfig } from 'sk-auth/dist/providers/oauth2';
import { OAuth2Provider } from 'sk-auth/providers';

interface Auth0Profile {
	id: number;
	login: string;
	avatar_url: string;
	url: string;
	name: string;
}
interface Auth0Tokens {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string | undefined;
	id_token?: string | undefined;
	refresh_token?: string | undefined;
}
type Auth0OAuth2ProviderConfig = OAuth2ProviderConfig<
	Auth0Profile,
	Auth0Tokens
>;

class Auth0OAuth2Provider extends OAuth2Provider<
	Auth0Profile,
	Auth0Tokens,
	Auth0OAuth2ProviderConfig
> {
	constructor(config: Auth0OAuth2ProviderConfig) {
		super({
			...defaultConfig,
			...config,
		});
	}
}

const defaultConfig: Auth0OAuth2ProviderConfig = {
	// TODO don't hardcode tenant name
	id: 'auth0',
	scope: 'openid',
	headers: {
		Accept: 'application/json',
		// 'Content-Type': 'application/json',
	},
};

// TODO see vhscom starter
const developmentOptions = {
	host: 'localhost:3000',
	protocol: 'http',
	basePath: '/api/auth',
};

export const auth0Auth = new SvelteKitAuth({
	providers: [
		new Auth0OAuth2Provider({
			clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
			clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
			authorizationUrl: 'https://dev-eehvhdp2.eu.auth0.com/authorize',
			accessTokenUrl: 'https://dev-eehvhdp2.eu.auth0.com/oauth/token',
			profileUrl: 'https://dev-eehvhdp2.eu.auth0.com/userinfo',
			scope: 'openid name picture profile email https://hasura.io/jwt/claims',
		}),
	],

	callbacks: {
		redirect: (uri) => uri, // Extend or introspect redirect callbacks
		// ...and access to other available AuthCallbacks as well
	},
	...developmentOptions,
	jwtSecret: import.meta.env.OAUTH_JWT_SECRET_KEY,
});
