export {};

declare global {
	interface Window {
		/**
		 * Checks if sveltekit is done hydrating the page.
		 * Based on the overriden `Page` fixture.
		 */
		started: boolean;
	}
}
