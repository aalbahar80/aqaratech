import {
	entity,
	getRoute,
	PageTab,
	PageType,
	PageTypePortfolio,
} from '@self/utils';

import { LOGOUT } from '$lib/constants/routes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type LL from '$i18n/i18n-svelte';
import type { NavigationItem } from '$lib/components/sidebar/types';
import type { User } from '$lib/models/types/auth.type';
import type { ReadableOf } from '$lib/utils/readable-of';

import HeroiconsOutlineCog8Tooth from '~icons/heroicons-outline/cog-8-tooth';
import HeroiconsOutlineCollection from '~icons/heroicons-outline/collection';
import HeroiconsOutlineDocumentReport from '~icons/heroicons-outline/document-report';
import HeroiconsOutlineDocumentText from '~icons/heroicons-outline/document-text';
import HeroiconsOutlineHome from '~icons/heroicons-outline/home';
import HeroiconsOutlineLogout from '~icons/heroicons-outline/logout';
import HeroiconsOutlineUser from '~icons/heroicons-outline/user';
import HeroiconsBanknotes from '~icons/heroicons/banknotes';
import HeroiconsCreditCard from '~icons/heroicons/credit-card';
import HeroiconsPlus from '~icons/heroicons/plus';
import HeroiconsReceiptPercent from '~icons/heroicons/receipt-percent';
import HeroiconsUserGroup from '~icons/heroicons/user-group';
import HeroiconsWrench from '~icons/heroicons/wrench';
// import HeroiconsCalculator from '~icons/heroicons/calculator';
// import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';

export const getNavigationTree = (
	user: User,
	L: ReadableOf<typeof LL>,
): NavigationItem[] => {
	const tree: NavigationItem[] = [
		{
			name: L.nav.account(),
			href: `/users/${user.id}/roles`,
			icon: HeroiconsOutlineUser,
			divided: true,
			linkOptions: {
				'data-sveltekit-reload': '',
			},
		},
		{
			name: L.buttons.logout(),
			href: LOGOUT,
			icon: HeroiconsOutlineLogout,
			linkOptions: {
				// Explicitly declare as external link to avoid a client-side error "Not Found".
				'data-sveltekit-reload': '',
			},
		},
	];

	if (!user.role) {
		// New users have no role yet. Render basic nav links.
		tree.splice(0, 0, {
			name: 'Create new organization',
			href: getRoute({
				entity: 'organization',
				pageType: PageType.New,
				params: {},
			}),
			icon: HeroiconsPlus,
			divided: true,
		});
		return tree;
	}

	const organizationId = user.role.organizationId;
	const pageType = PageType.List;

	if (user.role.roleType === 'ORGADMIN') {
		tree.splice(
			0,
			0,
			{
				name: entity.portfolio.pluralCap,
				href: getRoute({
					entity: 'portfolio',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsOutlineCollection,
			},
			{
				name: L.entity.leases(),
				href: getRoute({
					entity: 'lease',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: L.entity.tenants(),
				href: getRoute({
					entity: 'tenant',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsUserGroup,
			},
			{
				name: L.entity.maintenance(),
				href: getRoute({
					entity: 'maintenanceOrder',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsWrench,
			},
		);

		const settings = getRoute({
			entity: 'organization',
			pageType: PageType.Id,
			id: organizationId,
			params: {},
		});

		tree.splice(-1, 0, {
			name: L.nav.settings(),
			href: settings,
			icon: HeroiconsOutlineCog8Tooth,
			// path: '/settings/',
			children: [
				{
					name: L.entity.organization(),
					href: settings,
				},
				{
					name: 'Expense Categories',
					href: getRoute({
						entity: 'organization',
						pageType: PageTab.ExpenseCategories,
						id: organizationId,
						params: {},
					}),
				},
			],
		});
	}

	if (user.role.roleType === 'PORTFOLIO' && user.role.portfolioId) {
		const portfolioId = user.role.portfolioId;

		const getRouteConfig = {
			entity: 'portfolio',
			id: portfolioId,
			params: { organizationId, portfolioId },
		} as const;

		tree.splice(
			0,
			0,

			{
				name: L.nav.financials(),
				icon: HeroiconsOutlineDocumentReport,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Summary,
				}),
			},

			{
				name: L.nav.income(),
				icon: HeroiconsReceiptPercent,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Income,
				}),
				children: [
					{
						name: L.nav.charts(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Income,
						}),
					},
					{
						name: L.nav.data(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.IncomeTable,
						}),
					},
				],
			},

			{
				name: L.entity.expenses(),
				icon: HeroiconsCreditCard,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Expenses,
				}),
				children: [
					{
						name: L.nav.charts(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Expenses,
						}),
					},
					{
						name: L.nav.data(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.ExpensesTable,
						}),
					},
				],
			},

			{
				name: 'Payouts',
				icon: HeroiconsBanknotes,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.PayoutsTable,
				}),
			},

			{
				name: L.entity.properties(),
				href: getRoute({
					...getRouteConfig,
					pageType: PageTab.Properties,
				}),
				icon: HeroiconsOutlineHome,
				children: [
					{
						name: L.nav.list(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTab.Properties,
						}),
					},
					{
						name: L.nav.occupancy(),
						href: getRoute({
							...getRouteConfig,
							entity: 'portfolio',
							pageType: PageTab.Occupancy,
						}),
					},
				],
			},

			{
				name: L.entity.leases(),
				href:
					getRoute({
						...getRouteConfig,
						entity: 'lease',
						pageType,
					}) + '/table',
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: L.entity.maintenance(),
				href:
					getRoute({
						...getRouteConfig,
						entity: 'maintenanceOrder',
						pageType,
					}) + '/table',
				icon: HeroiconsWrench,
			},
		);
	}

	return tree;
};
