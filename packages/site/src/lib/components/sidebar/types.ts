export interface NavigationItem {
	name: string;
	href: string;
	// TODO: change to icon type
	icon?: any;
	children?: {
		name: string;
		href: string;
	}[];
	path?: string;
}
