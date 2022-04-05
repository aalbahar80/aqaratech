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

const defaultConfig: Auth0OAuth2ProviderConfig = {
	id: 'auth0',
	scope: 'openid',
	headers: {
		Accept: 'application/json',
		// 'Content-Type': 'application/json',
	},
};

export class Auth0OAuth2Provider extends OAuth2Provider<
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
