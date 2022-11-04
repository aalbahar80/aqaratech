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
import { settings } from '$lib/utils/route-helpers';

// Utils
import { getRoute } from '$lib/utils/route-helpers/get-route';
import {
	PageType,
	PageTypePortfolio,
} from '$lib/utils/route-helpers/route-helpers.type';

export const getNavigationTree = (user: User): NavigationItem[] => {
	if (!user.role) {
		// return empty array instead?
		throw new Error('User role is not defined');
	}

	const organizationId = user.role.organizationId;
	const pageType = PageType.List;

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

	if (user.role.roleType === 'ORGADMIN') {
		tree.splice(
			0,
			0,
			{
				name: 'Portfolios',
				href: getRoute({
					entity: 'portfolio',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsOutlineDocumentReport,
			},
			{
				name: 'Tenants',
				href: getRoute({
					entity: 'tenant',
					pageType,
					params: { organizationId },
				}),
				icon: HeroiconsOutlineDocumentReport,
			},
		);

		tree.splice(-1, 0, {
			name: 'Settings',
			href: settings(user.role.organizationId).organization,
			icon: HeroiconsOutlineCog8Tooth,
			// path: '/settings/',
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
				name: 'Financials',
				href: getRoute({
					...getRouteConfig,
					pageType: PageTypePortfolio.Summary,
				}),
				icon: HeroiconsOutlineDocumentReport,
				children: [
					{
						name: 'Summary',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Summary,
						}),
					},
					{
						name: 'Income',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Income,
						}),
					},
					{
						name: 'Expenses',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Expenses,
						}),
					},
					{
						name: 'Payouts',
						href: getRoute({
							...getRouteConfig,
							pageType: PageTypePortfolio.Payouts,
						}),
					},
				],
			},

			{
				name: 'Properties',
				href: getRoute({
					...getRouteConfig,
					entity: 'property',
					pageType,
				}),
				icon: HeroiconsOutlineHome,
			},

			{
				name: 'Units',
				href: getRoute({
					...getRouteConfig,
					entity: 'unit',
					pageType,
				}),
				icon: HeroiconsOutlineHome,
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
