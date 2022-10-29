import type { SvelteComponentTyped } from 'svelte';

export interface NavigationItem {
	name: string;
	href: string;
	// TODO: change to icon type
	icon?: typeof SvelteComponentTyped<svelte.JSX.IntrinsicElements['svg']>;
	children?: {
		name: string;
		href: string;
	}[];
	path?: string;
	divided?: boolean;
}
