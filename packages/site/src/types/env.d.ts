/// <reference types="node" />

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly AUTH0_CLIENT_SECRET: string;

			/**
			 * OPTIONAL
			 *
			 * The current url origin where the site is hosted.
			 * In development, this could be `http://localhost:3000`.
			 * In a docker environment behind a reverse proxy, this could be something like: `https://aqar.live`,
			 * Handles production, vercel previews, and local dev.
			 * Returns a preview branch's dedicated domain if it exists `https://stage.letand.be`,
			 * otherwise return the deployment domain  `https://my-site-7q03y4pi5.vercel.app`.
			 */
			readonly PUBLIC_SITE_URL: string | undefined;
			/**
			 * Same as PUBLIC_SITE_URL, but for backwards compatibility.
			 */
			readonly URL_ORIGIN: string | undefined;

			/**
			 * REQUIRED
			 *
			 * Api url reachable from the client.
			 * In development, this could be `http://localhost:3002`.
			 * In a docker environment behind a reverse proxy, this could be something like: `https://aqar.live/api`,
			 * where the reverse proxy strips the `/api` path and forwards the request to the backend.
			 * Doing so allows us to avoid a preflight requests and serve both site and api from the same origin.
			 */
			readonly PUBLIC_API_URL: string;

			/**
			 * OPTIONAL
			 *
			 * Api url reachable from the server. Used to access the api from the svelte-kit server.
			 * In development, this could be `http://backend:3002` since both site and backend are on the same docker compose network.
			 * In production, this could be the same as PUBLIC_API_URL.
			 *
			 * From: https://kit.svelte.dev/docs/hooks#externalfetch
			 *
			 * For example, your load function might make a request to a public URL like https://api.yourapp.com when the user performs a client-side navigation to the respective page, but during SSR it might make sense to hit the API directly (bypassing whatever proxies and load balancers sit between it and the public internet).
			 */
			readonly PUBLIC_API_URL_LOCAL: string;

			/**
			 * An indicator that the app is deployed and running on Vercel. Example: `1`.
			 */
			readonly VERCEL: string;

			/**
			 * Email used for myfatoorah invoices when not in production
			 * The URL of the deployment. Example: `my-site-7q03y4pi5.vercel.app`
			 */
			readonly VERCEL_URL: string;

			/**
			 * The Environment that the app is deployed an running on. The value can be either `production`, `preview`, or `development`.
			 */
			readonly VERCEL_ENV: 'production' | 'preview' | 'development';

			/**
			 * The git branch of the commit the deployment was triggered by. Example: `improve-about-page`.
			 */
			readonly VERCEL_GIT_COMMIT_REF: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
