import { getRoute, PageTab, PageType, PageTypePortfolio } from '@self/utils';

import type L from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import type { NavigationItem } from '$lib/components/sidebar/types';
import type { User } from '$lib/models/types/auth.type';
import type { ReadableOf } from '$lib/utils/readable-of';

import { LOGOUT, NEW_ORGANIZATION } from '$lib/constants/routes';
import HeroiconsBanknotes from '~icons/heroicons/banknotes';
import HeroiconsCreditCard from '~icons/heroicons/credit-card';
import HeroiconsPlus from '~icons/heroicons/plus';
import HeroiconsReceiptPercent from '~icons/heroicons/receipt-percent';
import HeroiconsUserGroup from '~icons/heroicons/user-group';
import HeroiconsWrench from '~icons/heroicons/wrench';
import HeroiconsOutlineCog8Tooth from '~icons/heroicons-outline/cog-8-tooth';
import HeroiconsOutlineCollection from '~icons/heroicons-outline/collection';
import HeroiconsOutlineDocumentReport from '~icons/heroicons-outline/document-report';
import HeroiconsOutlineDocumentText from '~icons/heroicons-outline/document-text';
import HeroiconsOutlineHome from '~icons/heroicons-outline/home';
import HeroiconsOutlineLogout from '~icons/heroicons-outline/logout';
import HeroiconsOutlineUser from '~icons/heroicons-outline/user';
// import HeroiconsCalculator from '~icons/heroicons/calculator';
// import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';

export const getNavigationTree = (
	user: User,
	LL: ReadableOf<typeof L>,
	locale: Locales,
): NavigationItem[] => {
	const langParam = {
		lang: locale,
	};

	const tree: NavigationItem[] = [
		{
			name: LL.nav.account(),
			href: `/${locale}/users/${user.id}/roles`,
			icon: HeroiconsOutlineUser,
			divided: true,
			linkOptions: {
				'data-sveltekit-reload': '',
			},
		},
		{
			name: LL.buttons.logout(),
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
			name: [LL.buttons.new(), LL.entity.organization.singular()].join(' '),
			href: NEW_ORGANIZATION(locale),
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
				name: LL.entity.portfolio.plural(),
				href: getRoute({
					entity: 'portfolio',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsOutlineCollection,
			},
			{
				name: LL.entity.lease.plural(),
				href: getRoute({
					entity: 'lease',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: LL.entity.leaseInvoice.plural(),
				href: getRoute({
					entity: 'leaseInvoice',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsReceiptPercent,
			},
			{
				name: LL.entity.tenant.plural(),
				href: getRoute({
					entity: 'tenant',
					pageType,
					params: { organizationId, ...langParam },
				}),
				icon: HeroiconsUserGroup,
			},
			{
				name: LL.entity.maintenanceOrder.plural(),
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
			name: LL.nav.settings(),
			href: settings,
			icon: HeroiconsOutlineCog8Tooth,
			// path: '/settings/',
			children: [
				{
					name: LL.entity.organization.singular(),
					href: settings,
				},
				{
					name: LL.nav.billing(),
					href: getRoute({
						entity: 'organization',
						pageType: PageTab.Billing,
						id: organizationId,
						params: {
							...langParam,
						},
					}),
				},
				{
					name: LL.entity.expenseCategory.plural(),
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
				name: LL.nav.financials(),
				icon: HeroiconsOutlineDocumentReport,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Summary,
				}),
			},

			{
				name: LL.nav.income(),
				icon: HeroiconsReceiptPercent,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Income,
				}),
				children: [
					{
						name: LL.nav.charts(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Income,
						}),
					},
					{
						name: LL.nav.data(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.IncomeTable,
						}),
					},
				],
			},

			{
				name: LL.entity.expense.plural(),
				icon: HeroiconsCreditCard,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Expenses,
				}),
				children: [
					{
						name: LL.nav.charts(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Expenses,
						}),
					},
					{
						name: LL.nav.data(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.ExpensesTable,
						}),
					},
				],
			},

			{
				name: LL.entity.payout.plural(),
				icon: HeroiconsBanknotes,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.PayoutsTable,
				}),
			},

			{
				name: LL.entity.property.plural(),
				href: getRoute({
					...getRouteConfig,
					pageType: PageTab.Properties,
				}),
				icon: HeroiconsOutlineHome,
				children: [
					{
						name: LL.nav.list(),
						href: getRoute({
							...getRouteConfig,
							pageType: PageTab.Properties,
						}),
					},
					{
						name: LL.nav.occupancy(),
						href: getRoute({
							...getRouteConfig,
							entity: 'portfolio',
							pageType: PageTab.Occupancy,
						}),
					},
				],
			},

			{
				name: LL.entity.lease.plural(),
				href:
					getRoute({
						...getRouteConfig,
						entity: 'lease',
						pageType,
					}) + '/table',
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: LL.entity.maintenanceOrder.plural(),
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
