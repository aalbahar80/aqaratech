import type { LoadEvent } from '@sveltejs/kit';

/**
 * A flag to indicate whether the sidebar and hamburger menu
 * should be available on the page.
 */
export const isSidebarAvailable = (route: LoadEvent['route']) =>
	route.id !== '/[lang=lang]';
