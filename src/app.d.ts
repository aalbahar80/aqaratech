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
	import { Chart } from 'chart.js/types/index.esm';
	export * from 'chart.js/types/index.esm';
	export default Chart;
}
