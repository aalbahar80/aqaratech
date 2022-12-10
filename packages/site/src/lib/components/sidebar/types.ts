import type { Icon } from '$lib/models/types/icon.type';

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
}
