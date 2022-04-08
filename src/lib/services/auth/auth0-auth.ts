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
			auth0Domain: 'dev-eehvhdp2.eu.auth0.com',
			clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
			clientSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
			scope: ['openid', 'profile', 'email'],
			authorizationParams: {
				audience: 'letand.be/api',
			},
			// params: {
			// 	audience: 'letand.be/api',
			// },
		}),
	],
	...developmentOptions,

	callbacks: {
		redirect: (uri) => uri, // Extend or introspect redirect callbacks
		// ...and access to other available AuthCallbacks as well
	},
	// jwtSecret: import.meta.env.VITE_AUTH0_CLIENT_SECRET,
});
