import type { HTMLAttributes } from 'svelte/elements';

import type { Icon } from '$lib/models/types/icon.type';

type LinkOptions = Pick<
	HTMLAttributes<HTMLAnchorElement>,
	'data-sveltekit-reload'
>;

export interface NavigationItem {
	name: string;
	href: string;
	icon?: Icon;
	children?: {
		name: string;
		href: string;
	}[];
	path?: string;
	divided?: boolean;
	linkOptions?: LinkOptions;
}
