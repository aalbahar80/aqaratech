import { dev } from '$app/env';
import { SvelteKitAuth } from 'sk-auth';
import { Auth0OAuth2Provider } from './auth0-provider';

// TODO see vhscom starter
const developmentOptions = dev
	? {
			host: 'localhost:3000',
			protocol: 'http',
			basePath: '/api/auth',
	  }
	: {};

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
