<script lang="ts">
	import { MenuItem } from '@rgossiaux/svelte-headlessui';

	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	import { getRoute, PageTab, PageType } from '@self/utils';

	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyTabs from '$lib/components/property/PropertyTabs.svelte';

	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';
	import HeroiconsWrench from '~icons/heroicons/wrench';

	export let data: LayoutData;
</script>

<Heading
	title="Property"
	id={data.property.id}
	entity="property"
	onDelete={async (api) => {
		await api.properties.remove({ id: data.property.id });

		const url = getRoute({
			entity: 'portfolio',
			id: data.property.portfolioId,
			pageType: PageTab.Properties,
			params: $page.params,
		});

		return url;
	}}
>
	<div slot="menu-items">
		<MenuItem as="div" let:active>
			<a
				href={getRoute({
					entity: 'expense',
					pageType: PageType.New,
					params: $page.params,
					predefined: {
						propertyId: data.property.id,
					},
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsSolidCreditCard} />
					Create expense
				</MenuItemChild>
			</a>
			<a
				href={getRoute({
					entity: 'maintenanceOrder',
					pageType: PageType.New,
					params: $page.params,
					predefined: {
						propertyId: data.property.id,
					},
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsWrench} />
					Create maintenance order
				</MenuItemChild>
			</a>
		</MenuItem>
	</div>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={data.property.breadcrumbs} />
	</svelte:fragment>
</Heading>

<PropertyTabs />

<slot />
