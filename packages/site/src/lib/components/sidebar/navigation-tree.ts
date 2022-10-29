// Types
import type { NavigationItem } from '$lib/components/sidebar/types';
import type { User } from '$lib/models/types/auth.type';

// Icons
import HeroiconsOutlineCog8Tooth from '~icons/heroicons-outline/cog-8-tooth';
import HeroiconsOutlineDocumentReport from '~icons/heroicons-outline/document-report';
import HeroiconsOutlineDocumentText from '~icons/heroicons-outline/document-text';
import HeroiconsOutlineHome from '~icons/heroicons-outline/home';
import HeroiconsOutlineLogout from '~icons/heroicons-outline/logout';
import HeroiconsOutlineUser from '~icons/heroicons-outline/user';

// Links
import { LOGOUT } from '$lib/constants/routes';

export const getNavigationTree = (user: User): NavigationItem[] => [
	{
		name: 'Financials',
		href: '/tempsample/',
		icon: HeroiconsOutlineDocumentReport,
		children: [
			{ name: 'Summary', href: '/financials/summary/' },
			{
				name: 'Income',
				href: '/financials/income/',
			},
			{
				name: 'Expenses',
				href: '/financials/expenses/',
			},
			{ name: 'Payouts', href: '/financials/payouts/' },
		],
	},
	{
		name: 'Properties',
		href: '/properties/',
		icon: HeroiconsOutlineHome,
	},
	{
		name: 'Leases',
		href: '/leases/',
		icon: HeroiconsOutlineDocumentText,
	},
	{
		name: 'Account',
		href: `/users/${user.id}/roles`,
		icon: HeroiconsOutlineUser,
		divided: true,
	},
	{
		name: 'Settings',
		href: '/settings/',
		icon: HeroiconsOutlineCog8Tooth,
		// path: '/settings/',
	},
	{
		name: 'Logout',
		href: LOGOUT,
		icon: HeroiconsOutlineLogout,
	},
];
