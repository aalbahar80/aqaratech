import { Providers, SvelteKitAuth } from 'sk-auth';
import { GitHubOAuth2Provider } from 'sk-auth/providers';

// TODO see vhscom starter
const developmentOptions = {
	host: 'localhost:3000',
	protocol: 'http',
	basePath: '/api/auth',
};

export const githubAuth = new SvelteKitAuth({
	providers: [
		new GitHubOAuth2Provider({
			// TODO dotenv as per vhscom starter
			clientId: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID,
			clientSecret: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_SECRET,
			profile(profile) {
				return {
					...profile,
					provider: 'github',
				};
			},
		}),

		new (class extends Providers.GitHubOAuth2Provider {
			// Bespoke class illustrating how to customize a provider
			// To use, navigate user agent to /api/auth/signin/custom
			constructor() {
				super({
					clientId: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_ID,
					clientSecret: import.meta.env.VITE_GITHUB_OAUTH_CLIENT_SECRET,
					profile(profile) {
						return {
							...profile,
							provider: 'custom',
						};
					},
				});
			}

			// For example, monkey patch a method of the abstract base class
			// to nullify AuthConfig options affecting redirect URIs
			override getCallbackUri(): string {
				return import.meta.env.VITE_CUSTOM_OAUTH_REDIRECT_URI;
			}
		})(),
	],

	callbacks: {
		redirect: (uri) => uri, // Extend or introspect redirect callbacks
		// ...and access to other available AuthCallbacks as well
	},
	...developmentOptions,
	jwtSecret: import.meta.env.OAUTH_JWT_SECRET_KEY,
});
