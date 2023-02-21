/// <reference types="@sveltejs/kit" />
/// <reference types="vite/client" />
/// <reference types="unplugin-icons/types/svelte" />

declare const __AQARATECH_APP_VERSION__: string;

declare namespace App {
	interface Locals {
		user: import('$models/types/auth.type').User | undefined;

		locale: import('$i18n/i18n-types').Locales | undefined;
		LL: import('$i18n/i18n-types').TranslationFunctions;
	}

	interface PageData {
		user: import('$models/types/auth.type').User | undefined;
		tabLabels?: import('$lib/components/tabs/tab-labels').TabLabels | undefined;
	}

	interface Error {
		message: string;
		status?: number;
		frame?: string;
	}

	// interface Platform {}
}

declare type Item = import('svelte-dnd-action').Item;
declare type DndEvent<ItemType = Item> =
	import('svelte-dnd-action').DndEvent<ItemType>;
declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLAttributes<T> {
		onconsider?: (
			event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T },
		) => void;
		onfinalize?: (
			event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T },
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
		'ondata-select'?: unknown;
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
