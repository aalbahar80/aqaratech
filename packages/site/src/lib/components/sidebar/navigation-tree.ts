import type { Navigation } from '$lib/components/sidebar/types';

export const navigationTree: Navigation[] = [
	{
		name: 'Financials',
		href: '/tempsample/',
		icon: '<svg class="h-6 w-6 text-gray-500 2xl:h-5 2xl:w-5 x2xl:h-6 x2xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="max-width:40px" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
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
		icon: '<svg class="h-6 w-6 text-gray-500 2xl:h-5 2xl:w-5 x2xl:h-6 x2xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="max-width:40px" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
	},
	{
		name: 'Leases',
		href: '/leases/',
		icon: '<svg class="h-6 w-6 text-gray-500 2xl:h-5 2xl:w-5 x2xl:h-6 x2xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="max-width:40px" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>',
	},
	{
		name: 'Account',
		href: '/account/',
		icon: '<svg class="h-6 w-6 text-gray-500 2xl:h-5 2xl:w-5 x2xl:h-6 x2xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="max-width:40px" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>',
	},
	{
		name: 'Settings',
		href: '/settings/',
		icon: '<svg class="h-6 w-6 text-gray-500 2xl:h-5 2xl:w-5 x2xl:h-6 x2xl:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="max-width:40px" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
		// path: '/settings/',
	},
];
