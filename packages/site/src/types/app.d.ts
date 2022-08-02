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
