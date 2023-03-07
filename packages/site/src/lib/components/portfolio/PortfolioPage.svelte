<script lang="ts">
	import { MenuItem } from '@rgossiaux/svelte-headlessui';

	import { page } from '$app/stores';
	import { getRoute, PageType } from '@self/utils';

	import type { PortfolioDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import Fa6SolidMoneyBillTransfer from '~icons/fa6-solid/money-bill-transfer';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';

	export let portfolio: PortfolioDto;
</script>

<Heading
	title={$L.entity.portfolio.singular()}
	id={portfolio.id}
	entity="portfolio"
	onDelete={async (api) => {
		await api.portfolios.remove({ id: portfolio.id });

		const url = getRoute({
			entity: 'portfolio',
			pageType: PageType.List,
			params: $page.params,
		});

		return url;
	}}
>
	<div slot="menu-items">
		<MenuItem
			as="div"
			let:active
		>
			<a
				href={getRoute({
					entity: 'payout',
					params: $page.params,
					pageType: PageType.New,
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={Fa6SolidMoneyBillTransfer} />
					Create payout
				</MenuItemChild>
			</a>
		</MenuItem>
		<MenuItem
			as="div"
			let:active
		>
			<a
				href={getRoute({
					entity: 'expense',
					params: $page.params,
					pageType: PageType.New,
					predefined: {
						portfolioId: portfolio.id,
					},
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsSolidCreditCard} />
					{$L.buttons.new() + ' ' + $L.entity.expense.singular()}
				</MenuItemChild>
			</a>
		</MenuItem>
	</div>
</Heading>
