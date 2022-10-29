import type { NavigationItem } from '$lib/components/sidebar/types';
import HeroiconsOutlineCollection from '~icons/heroicons-outline/collection';

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
		icon: HeroiconsOutlineCollection,
	},
	{
		name: 'Leases',
		href: '/leases/',
		icon: HeroiconsOutlineCollection,
	},
	{
		name: 'Account',
		href: '/account/',
		icon: HeroiconsOutlineCollection,
	},
	{
		name: 'Settings',
		href: '/settings/',
		icon: HeroiconsOutlineCollection,
		// path: '/settings/',
	},
];
