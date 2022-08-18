/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />

interface Auth0Profile {
	sub: string | undefined;
	name: string;
	email: string;
	updatedAt: string;
}
interface ImportMetaEnv {
	// See https://vercel.com/docs/concepts/projects/environment-variables
	// for information about these environment variables
	readonly VITE_VERCEL_ENV: 'production' | 'preview' | 'development';
	/**
	 * The URL of the deployment. Example: `my-site-7q03y4pi5.vercel.app`
	 */
	readonly VITE_VERCEL_URL: string;

	/**
	 * The git branch of the commit the deployment was triggered by. Example: `improve-about-page`.
	 */
	readonly VITE_VERCEL_GIT_COMMIT_REF: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
declare namespace App {
	interface Locals {
		user: import('$models/types/auth.type').User | undefined;
		accessToken: string | undefined;
		idToken: string | undefined;
		xRoleId: string | undefined;
		isAuthenticated: boolean;
	}

	// interface Platform {}

	interface Session {
		user: Readonly<import('$models/types/auth.type').User> | undefined;
		accessToken: string;
		/**
		 * Whether the user is authenticated. This is different from `user` being defined.
		 * When a user first signs up in auth0 and redirected to the app, `user` is undefined but `isAuthenticated` is true.
		 */
		isAuthenticated: boolean;
	}

	interface Stuff {
		api: import('$lib/client/api').Api;
	}

	interface PrivateEnv {
		AUTH0_CLIENT_SECRET: string;
	}

	interface PublicEnv {
		readonly PUBLIC_AQARATECH_ENV: string | undefined;

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
	}
}

declare module 'chart.js/dist/chart.esm' {
	// https://github.com/ivanhofer/sveltekit-typescript-showcase#2-extend-existing-type-definitions
	import type { Chart } from 'chart.js/types/index.esm';
	export * from 'chart.js/types/index.esm';
	export default Chart;
}

declare type DndEvent = import('svelte-dnd-action').DndEvent;
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		onconsider?: (
			event: CustomEvent<DndEvent> & { target: EventTarget & T },
		) => void;
		onfinalize?: (
			event: CustomEvent<DndEvent> & { target: EventTarget & T },
		) => void;
	}
}

declare namespace svelte.JSX {
	interface DOMAttributes<T> {
		/**
		 * Custom event I created to use along with `use:clickOutside` to detect when the user clicks outside of a component.
		 */
		onoutclick?: CompositionEventHandler<T>;
	}
}
