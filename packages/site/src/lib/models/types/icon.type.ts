import type { SvelteComponentTyped } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

export type Icon = typeof SvelteComponentTyped<SvelteHTMLElements['svg']>;
