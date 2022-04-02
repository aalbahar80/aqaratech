/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Locals {
		hasura: string;
		user: string;
		userId: string;
	}

	// interface Platform {}

	interface Session {
		hasura: string;
		user: string;
		userId: string;
	}

	interface Stuff {
		lease: import('$lib/client/trpc').InferQueryOutput<'leases:read'>;
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
