import { getRoute, PageTab, PageType, PageTypePortfolio } from '@self/utils';

import { LOGOUT } from '$lib/constants/routes';

// eslint-disable-next-line import/no-named-as-default
import type LL from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
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
	locale: Locales,
): NavigationItem[] => {
	const langParam = {
		lang: locale,
	};

	const tree: NavigationItem[] = [
		{
			name: L.nav.account(),
			href: `/${locale}/users/${user.id}/roles`,
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
				params: {
					...langParam,
				},
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
				name: L.entity.portfolio.plural(),
				href: getRoute({
					entity: 'portfolio',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsOutlineCollection,
			},
			{
				name: L.entity.lease.plural(),
				href: getRoute({
					entity: 'lease',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: L.entity.tenant.plural(),
				href: getRoute({
					entity: 'tenant',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsUserGroup,
			},
			{
				name: L.entity.maintenanceOrder.plural(),
				href: getRoute({
					entity: 'maintenanceOrder',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsWrench,
			},
		);

		const settings = getRoute({
			entity: 'organization',
			pageType: PageType.Id,
			id: organizationId,
			params: {
				...langParam,
			},
		});

		tree.splice(-1, 0, {
			name: L.nav.settings(),
			href: settings,
			icon: HeroiconsOutlineCog8Tooth,
			// path: '/settings/',
			children: [
				{
					name: L.entity.organization.singular(),
					href: settings,
				},
				{
					name: L.entity.expenseCategory.plural(),
					href: getRoute({
						entity: 'organization',
						pageType: PageTab.ExpenseCategories,
						id: organizationId,
						params: {
							...langParam,
						},
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
			params: { organizationId, portfolioId, ...langParam },
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
				name: L.entity.expense.plural(),
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
				name: L.entity.payout.plural(),
				icon: HeroiconsBanknotes,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.PayoutsTable,
				}),
			},

			{
				name: L.entity.property.plural(),
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
				name: L.entity.lease.plural(),
				href:
					getRoute({
						...getRouteConfig,
						entity: 'lease',
						pageType,
					}) + '/table',
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: L.entity.maintenanceOrder.plural(),
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
