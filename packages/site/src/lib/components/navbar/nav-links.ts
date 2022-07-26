import { dev } from '$app/env';
import { getDocs } from '$lib/components/navbar/docs-url';
import { LOGOUT } from '$lib/constants/routes';
import {
	Code,
	Cog,
	InformationCircle,
	Logout,
	SwitchHorizontal,
} from '@steeze-ui/heroicons';

export const getNavOptions = (user: App.Session['user']) => [
	...(dev ? [{ label: 'Debug', href: '/debug', icon: Code }] : []),
	{
		label: 'Switch Role',
		href: `/users/${user?.id}/roles`,
		icon: SwitchHorizontal,
	},
	{
		label: 'Settings',
		href: `/organizations/${user?.role.organizationId}/settings/expense-tree`,
		icon: Cog,
	},
	{ label: 'Docs', href: getDocs(), icon: InformationCircle }, // TODO: open in new tab { target="_blank" } & sveltekit:reload & only admins?
	{ label: 'Logout', href: LOGOUT, icon: Logout }, // sveltekit:reload?
];
