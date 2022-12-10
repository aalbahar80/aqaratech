import type { SvelteComponentTyped } from 'svelte';

export type Icon = typeof SvelteComponentTyped<
	svelte.JSX.IntrinsicElements['svg']
>;
