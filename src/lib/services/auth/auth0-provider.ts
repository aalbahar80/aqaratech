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
	scope: string;
}

type Auth0OAuth2ProviderConfig = OAuth2ProviderConfig<
	Auth0Profile,
	Auth0Tokens
>;
interface Auth0RequiredConfig extends Auth0OAuth2ProviderConfig {
	auth0Domain: string;
	audience?: string;
}

const defaultConfig: Partial<Auth0RequiredConfig> = {
	id: 'auth0',
	scope: ['openid'],
};

export class Auth0OAuth2Provider extends OAuth2Provider<
	Auth0Profile,
	Auth0Tokens,
	Auth0OAuth2ProviderConfig
> {
	constructor(config: Auth0RequiredConfig) {
		const constructedUrls: Partial<Auth0OAuth2ProviderConfig> = {
			accessTokenUrl:
				config.accessTokenUrl || `https://${config.auth0Domain}/oauth/token`,
			// https://auth0.com/docs/authenticate/login/auth0-universal-login/new-experience#signup
			authorizationUrl:
				config.authorizationUrl ||
				`https://${config.auth0Domain}/authorize?prompt=login`,
			profileUrl: config.profileUrl || `https://${config.auth0Domain}/userinfo`,
		};
		super({
			...defaultConfig,
			...constructedUrls,
			...config,
		});
	}
	override getTokens = async (code: string, redirectUri: string) => {
		if (!this.config.accessTokenUrl) {
			return Promise.reject(
				new Error('accessTokenUrl is required for Auth0OAuth2Provider'),
			);
		}
		try {
			const res = await fetch(this.config.accessTokenUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					grant_type: 'authorization_code',
					client_id: this.config.clientId,
					client_secret: this.config.clientSecret,
					code,
					redirect_uri: redirectUri,
				}),
			});

			const tokens: Auth0Tokens = (await res.json()) as Auth0Tokens;
			console.log({ tokens });
			return tokens;
		} catch (e) {
			console.error(e);
			throw e;
		}
	};
}
