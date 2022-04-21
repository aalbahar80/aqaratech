export type UserType =
	| 'admin'
	| 'property-owner'
	| 'tenant'
	| 'unauthenticated';

export interface NavbarItem {
	name: string;
	href: string;
}

export interface UserConfig {
	type: UserType;
	navLinks: NavbarItem[];
}
