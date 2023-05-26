import type { HTMLAttributes } from 'svelte/elements';

import type { Icon } from '$lib/models/types/icon.type';
import type { NavKey } from './nav-key';

type LinkOptions = Partial<
	| Pick<HTMLAttributes<HTMLAnchorElement>, 'data-sveltekit-reload'>
	| Pick<HTMLAnchorElement, 'rel'>
>;

export type NavigationItemAction =
	| {
			href: string;
			isButton?: false;
			onClick?: () => void | Promise<void>;
	  }
	| {
			isButton: true;
			onClick: () => void | Promise<void>;
	  };

export type NavigationItem = {
	name: string;
	icon?: Icon;
	children?: ({
		name: string;
	} & NavigationItemAction)[];
	path?: string;
	divided?: boolean;
	linkOptions?: LinkOptions;
	navKey?: NavKey;
} & NavigationItemAction;
