import { dev } from '$app/env';
import { getDocs } from '$lib/components/navbar/docs-url';
import { LOGOUT } from '$lib/constants/routes';
import type { NavbarItem } from '$lib/models/types/auth.type';
import { Code, InformationCircle, Logout } from '@steeze-ui/heroicons';

export const getRoleOptions = (user: App.Session['user']): NavbarItem[] =>
	user?.roles.map((role) => ({
		href: `/auth/roles/${role.id}`,
		label: `${role.organization.fullName} : ${role.meta.roleLabel}`,
	})) || [];

export const getNavOptions = (user: App.Session['user']) => [
	...getRoleOptions(user),
	...(dev ? [{ label: 'Debug', href: '/debug', icon: Code }] : []),
	// { label: 'Settings', href: '#', icon: Cog },
	{ label: 'Docs', href: getDocs(), icon: InformationCircle }, // TODO: open in new tab { target="_blank" } & sveltekit:reload & only admins?
	{ label: 'Logout', href: LOGOUT, icon: Logout }, // sveltekit:reload?
];
