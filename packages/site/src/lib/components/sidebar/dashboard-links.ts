import { goto } from '$app/navigation';
import { getRoute, PageTypePortfolio } from '@self/utils';

import type L from '$i18n/i18n-svelte';
import type { ReadableOf } from '$lib/utils/readable-of';
import type { NavigationItem, NavigationItemAction } from './types';

import { createApi } from '$api';
import HeroiconsCreditCard from '~icons/heroicons/credit-card';
import HeroiconsReceiptPercent from '~icons/heroicons/receipt-percent';
// import HeroiconsCalculator from '~icons/heroicons/calculator';
// import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';

interface GetDashboardLinksArgs {
	portfolioId: string | undefined;
	organizationId: string;
	lang: string;
	LL: ReadableOf<typeof L>;
}

type LazyGetRouteParams = GetDashboardLinksArgs & {
	pageType: PageTypePortfolio;
};
const lazyGetRoute = (args: LazyGetRouteParams): NavigationItemAction => {
	const getRouteConfig = (portfolioId: string) =>
		({
			entity: 'portfolio',
			id: portfolioId, // we can't guarantee that portfolioId will be defined (this is the case for org admins), so we try to get it from the url
			pageType: args.pageType,
			params: {
				organizationId: args.organizationId,
				portfolioId,
				lang: args.lang,
			},
		} as const);

	if (args.portfolioId) {
		return {
			href: getRoute(getRouteConfig(args.portfolioId)),
		};
	} else {
		return {
			isButton: true,
			onClick: async () => {
				const portfolios = await createApi().portfolios.findAll();
				const lazyPortfolioId = portfolios.results[0]?.id;
				if (!lazyPortfolioId) {
					throw new Error('No portfolio found.');
				}
				const url = getRoute(getRouteConfig(lazyPortfolioId));
				return await goto(url);
			},
		};
	}
};

/** Get the dashboard links for a portfolio. */
export const getDashboardLinks = (
	args: GetDashboardLinksArgs,
): NavigationItem[] => {
	const { LL } = args;
	return [
		{
			name: LL.nav.income(),
			icon: HeroiconsReceiptPercent,
			...lazyGetRoute({
				pageType: PageTypePortfolio.Income,
				...args,
			}),
		},

		{
			name: LL.entity.expense.plural(),
			icon: HeroiconsCreditCard,
			...lazyGetRoute({
				pageType: PageTypePortfolio.Expenses,
				...args,
			}),
		},
	];
};
