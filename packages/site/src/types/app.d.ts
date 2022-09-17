/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />

declare const __AQARATECH_APP_VERSION__: string;

declare namespace App {
	interface Locals {
		user: import('$models/types/auth.type').User | undefined;
		accessToken: string | undefined;
		idToken: string | undefined;
		xRoleId: string | undefined;
		isAuthenticated: boolean;
		isAqaratechStaff: boolean;
	}

	interface PageError {
		message: string;
		code: string;
		frame?: string;
	}

	// interface Platform {}
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

		/**
		 * Frappe Charts event. Create a better type if using this.
		 */
		'ondata-select'?: any;
	}
}
