/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

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
		accessToken: string;
		idToken: string;
		user: Auth0Profile | undefined;
		authz: import('$models/types/auth.type').Authz | null;
	}

	// interface Platform {}

	interface Session {
		user: Readonly<Auth0Profile> | undefined;
		authz: import('$models/types/auth.type').Authz | null;
	}

	interface Stuff {
		lease: import('$lib/client/trpc').InferQueryOutput<'leases:read'>;
	}
}

type FormType = 'create' | 'update';

declare module 'chart.js/dist/chart.esm' {
	// https://github.com/ivanhofer/sveltekit-typescript-showcase#2-extend-existing-type-definitions
	import type { Chart } from 'chart.js/types/index.esm';
	export * from 'chart.js/types/index.esm';
	export default Chart;
}

declare module 'svelte-select' {
	import type { SelectProps } from 'svelte-select/src/index.d';
	import type { SvelteComponentTyped } from 'svelte';
	export default class SvelteSelect extends SvelteComponentTyped<SelectProps> {}
}
