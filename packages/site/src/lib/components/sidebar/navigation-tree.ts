import type { NavigationItem } from '$lib/components/sidebar/types';
import HeroiconsOutlineCog8Tooth from '~icons/heroicons-outline/cog-8-tooth';
import HeroiconsOutlineCollection from '~icons/heroicons-outline/collection';
import HeroiconsOutlineDocumentText from '~icons/heroicons-outline/document-text';
import HeroiconsOutlineHome from '~icons/heroicons-outline/home';
import HeroiconsOutlineUser from '~icons/heroicons-outline/user';

export const navigationTree: NavigationItem[] = [
	{
		name: 'Financials',
		href: '/tempsample/',
		icon: HeroiconsOutlineCollection,
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
		href: '/account/',
		icon: HeroiconsOutlineUser,
		divided: true,
	},
	{
		name: 'Settings',
		href: '/settings/',
		icon: HeroiconsOutlineCog8Tooth,
		// path: '/settings/',
	},
];
