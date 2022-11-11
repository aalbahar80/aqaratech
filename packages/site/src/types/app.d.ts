/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />

declare const __AQARATECH_APP_VERSION__: string;

declare namespace App {
	interface Locals {
		user: import('$models/types/auth.type').User | undefined;
		isAqaratechStaff: boolean;
	}

	interface PageData {
		user: import('$models/types/auth.type').User | undefined;
	}

	interface Error {
		message: string;
		status?: number;
		frame?: string;
	}

	// interface Platform {}
}

// Update here: https://github.com/isaacHagoel/svelte-dnd-action/pull/401
declare type DndEvent = import('svelte-dnd-action').DndEvent;
declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// vite-plugin-iso-import intellisense workaround (needed for .svelte files & svelte-check)
// https://github.com/bluwy/vite-plugin-iso-import#using-client-and-server-loses-intellisense
declare module '@sentry/svelte?client' {
	import * as all from '@sentry/svelte';
	export = all;
}

declare module '@sentry/tracing?client' {
	import * as all from '@sentry/tracing';
	export = all;
}

declare module '@sentry/node?server' {
	import * as all from '@sentry/node';
	export = all;
}

// fallback - disabled for now
// declare module '*?client'
// declare module '*?server'

declare module 'date-fns-tz/esm' {
	import * as all from 'date-fns-tz';
	export = all;
}
