import { getRoute, PageTypePortfolio } from '@self/utils';

import type L from '$i18n/i18n-svelte';
import type { ReadableOf } from '$lib/utils/readable-of';

import HeroiconsCreditCard from '~icons/heroicons/credit-card';
import HeroiconsReceiptPercent from '~icons/heroicons/receipt-percent';
// import HeroiconsCalculator from '~icons/heroicons/calculator';
// import HeroiconsCurrencyDollar from '~icons/heroicons/currency-dollar';

/** Get the dashboard links for a portfolio. */
export const getDashboardLinks = ({
	organizationId,
	portfolioId,
	lang,
	LL,
}: {
	portfolioId: string;
	organizationId: string;
	lang: string;
	LL: ReadableOf<typeof L>;
}) => {
	const getRouteConfig = {
		entity: 'portfolio',
		id: portfolioId,
		params: { organizationId, portfolioId, lang },
	} as const;

	return [
		{
			name: LL.nav.income(),
			icon: HeroiconsReceiptPercent,
			href: getRoute({
				pageType: PageTypePortfolio.Income,
				...getRouteConfig,
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
	];
};
