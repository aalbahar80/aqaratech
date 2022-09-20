<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { create } from '$lib/utils/route-helpers';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import type { PortfolioDto } from '$api/openapi';
	import { entitiesMap } from '@self/utils';
	import { PresentationChartBar } from '@steeze-ui/heroicons';
	import Fa6SolidMoneyBillTransfer from '~icons/fa6-solid/money-bill-transfer';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';

	export let portfolio: PortfolioDto;
</script>

<Heading title="Portfolio" id={portfolio.id} entity="portfolio">
	<div slot="menu-items">
		<MenuItem as="div" let:active>
			<a
				href={create({
					entity: 'payout',
					predefined: new Map([[entitiesMap.portfolio.idField, portfolio.id]]),
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={Fa6SolidMoneyBillTransfer} />
					Create payout
				</MenuItemChild>
			</a>
		</MenuItem>
		<MenuItem as="div" let:active>
			<a
				href={create({
					entity: 'expense',
					predefined: new Map([['portfolioId', portfolio.id]]),
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsSolidCreditCard} />
					Create expense
				</MenuItemChild>
			</a>
		</MenuItem>
	</div>
	<svelte:fragment slot="actions">
		<Button
			icon={PresentationChartBar}
			text="Dashboard"
			as="a"
			href={`/portfolios/${portfolio.id}/dashboard`}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>
