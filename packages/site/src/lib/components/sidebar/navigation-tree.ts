// Types
import type { NavigationItem } from '$lib/components/sidebar/types';
import type { User } from '$lib/models/types/auth.type';

// Icons
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
// import HeroiconsCalculator from '~icons/heroicons/calculator';
// import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';

// Links
import { LOGOUT } from '$lib/constants/routes';
import {
	entity,
	getRoute,
	PageTab,
	PageType,
	PageTypePortfolio,
} from '@self/utils';

export const getNavigationTree = (user: User): NavigationItem[] => {
	const tree: NavigationItem[] = [
		{
			name: 'Account',
			href: `/users/${user.id}/roles`,
			icon: HeroiconsOutlineUser,
			divided: true,
		},
		{
			name: 'Logout',
			href: LOGOUT,
			icon: HeroiconsOutlineLogout,
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
				name: 'Leases',
				href: getRoute({
					entity: 'lease',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsOutlineDocumentText,
			},
			{
				name: 'Tenants',
				href: getRoute({
					entity: 'tenant',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsUserGroup,
			},
		);

		const settings = getRoute({
			entity: 'organization',
			pageType: PageType.Id,
			id: organizationId,
			params: {},
		});

		tree.splice(-1, 0, {
			name: 'Settings',
			href: settings,
			icon: HeroiconsOutlineCog8Tooth,
			// path: '/settings/',
			children: [
				{
					name: 'Organization',
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
				// name: 'Summary',
				name: 'Financials',
				icon: HeroiconsOutlineDocumentReport,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Summary,
				}),
			},

			{
				name: 'Income',
				icon: HeroiconsReceiptPercent,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Income,
				}),
				children: [
					{
						name: 'Charts',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Income,
						}),
					},
					{
						name: 'Data',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.IncomeTable,
						}),
					},
				],
			},

			{
				name: 'Expenses',
				icon: HeroiconsCreditCard,
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Expenses,
				}),
				children: [
					{
						name: 'Charts',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Expenses,
						}),
					},
					{
						name: 'Data',
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
				name: 'Properties',
				href: getRoute({
					...getRouteConfig,
					pageType: PageTab.Properties,
				}),
				icon: HeroiconsOutlineHome,
				children: [
					{
						name: 'List',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTab.Properties,
						}),
					},
					{
						name: 'Occupancy',
						href: getRoute({
							...getRouteConfig,
							entity: 'portfolio',
							pageType: PageTab.Occupancy,
						}),
					},
				],
			},

			{
				name: 'Leases',
				href:
					getRoute({
						...getRouteConfig,
						entity: 'lease',
						pageType,
					}) + '/table',
				icon: HeroiconsOutlineDocumentText,
			},
		);
	}

	return tree;
};
