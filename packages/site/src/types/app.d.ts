/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />

interface Auth0Profile {
	sub: string;
	name: string;
	picture: string;
	email: string;
	updated_at: string;
}
interface ImportMetaEnv {
	// See https://vercel.com/docs/concepts/projects/environment-variables
	// for information about these environment variables
	readonly VITE_VERCEL_ENV: 'production' | 'preview' | 'development';
	readonly VITE_VERCEL_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
declare namespace App {
	interface Locals {
		accessToken: string;
		idToken: string;
		user: Auth0Profile | undefined;
		authz: Authz | null;
	}

	// interface Platform {}

	interface Session {
		user: Readonly<Auth0Profile> | undefined;
		authz: import('$models/types/auth.type').Authz | null;
	}

	interface Stuff {
		lease: import('$lib/client/trpc').InferQueryOutput<'leases:read'>;
		hrefBase: string | undefined;
	}
}

type FormType = 'create' | 'update';

declare module 'chart.js/dist/chart.esm' {
	// https://github.com/ivanhofer/sveltekit-typescript-showcase#2-extend-existing-type-definitions
	import { Chart } from 'chart.js/types/index.esm';
	export * from 'chart.js/types/index.esm';
	export default Chart;
}

declare module 'svelte-select' {
	import { SelectProps } from 'svelte-select/src/index.d';
	import { SvelteComponentTyped } from 'svelte';
	export default class SvelteSelect extends SvelteComponentTyped<SelectProps> {}
}
