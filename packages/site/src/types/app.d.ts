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
		fallbackPortfolioId?:
			| import('$lib/stores/fallback-portfolio-id').FallBackPortfolioId
			| undefined;
	}

	interface Error {
		message: string;
		status?: number;
		frame?: string;
	}

	// interface Platform {}
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
