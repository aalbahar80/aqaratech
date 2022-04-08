import type { OAuth2ProviderConfig } from 'sk-auth/dist/providers/oauth2';
import { OAuth2Provider } from 'sk-auth/providers';

interface Auth0Profile {
	sub: string;
	name: string;
	picture: string;
	email: string;
	updated_at: string;
}

interface Auth0Tokens {
	access_token: string;
	refresh_token?: string | undefined;
	id_token: string | undefined;
	token_type: string;
	expires_in: number;
	// scope?: string | undefined;
}

type Auth0OAuth2ProviderConfig = OAuth2ProviderConfig<
	Auth0Profile,
	Auth0Tokens
>;
interface Auth0RequiredConfig extends Auth0OAuth2ProviderConfig {
	auth0Domain: string;
}

const defaultConfig: Partial<Auth0RequiredConfig> = {
	id: 'auth0',
	scope: ['openid', 'profile', 'email'],
};

export class Auth0OAuth2Provider extends OAuth2Provider<
	Auth0Profile,
	Auth0Tokens,
	Auth0OAuth2ProviderConfig
> {
	constructor(config: Auth0RequiredConfig) {
		const constructedUrls: Partial<Auth0OAuth2ProviderConfig> = {
			accessTokenUrl:
				config.accessTokenUrl || `https://${config.auth0Domain}/oauth/token/`,
			authorizationUrl:
				config.authorizationUrl || `https://${config.auth0Domain}/authorize`,
			profileUrl: config.profileUrl || `https://${config.auth0Domain}/userinfo`,
		};
		super({
			...defaultConfig,
			...constructedUrls,
			...config,
		});
	}
}
