import { dev } from '$app/environment';
import { LOGOUT } from '$lib/constants/routes';
import type { User } from '$lib/models/types/auth.type';
import { settings } from '$lib/utils/route-helpers';
import type { SvelteComponentTyped } from 'svelte';
import HeroiconsSolidCode from '~icons/heroicons-solid/code';
import HeroiconsSolidCog from '~icons/heroicons-solid/cog';
import HeroiconsSolidLogout from '~icons/heroicons-solid/logout';
import HeroiconsSolidSwitchHorizontal from '~icons/heroicons-solid/switch-horizontal';
import MaterialSymbolsAddBusinessRounded from '~icons/material-symbols/add-business-rounded';

interface NavOption {
	label: string;
	href: string;
	icon: typeof SvelteComponentTyped<svelte.JSX.IntrinsicElements['svg']>;
	external?: boolean;
	hideOnPopover?: boolean;
}

// TODO can user be undefined?
export const getNavOptions = (user: User): NavOption[] => [
	...(dev
		? [{ label: 'Debug', href: '/debug', icon: HeroiconsSolidCode }]
		: []),
	...(user
		? [
				{
					label: 'Switch Role',
					href: `/users/${user?.id}/roles`,
					icon: HeroiconsSolidSwitchHorizontal,
				},
		  ]
		: [
				{
					label: 'Get started',
					href: `/welcome`,
					icon: MaterialSymbolsAddBusinessRounded,
				},
		  ]),
	...(user?.role && user.role.roleType === 'ORGADMIN'
		? [
				{
					label: 'Settings',
					href: settings(user?.role.organizationId).organization,
					icon: HeroiconsSolidCog,
					hideOnPopover: true,
				},
		  ]
		: []),
	// { label: 'Docs', href: getDocs(), icon: InformationCircle }, // TODO: open in new tab { target="_blank" } & sveltekit:reload & only admins?
	{ label: 'Logout', href: LOGOUT, icon: HeroiconsSolidLogout, external: true },
];
