<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyTabs from '$lib/components/property/PropertyTabs.svelte';
	import { create } from '$lib/utils/route-helpers';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Heading title="Property" id={data.property.id} entity="property">
	<div slot="menu-items">
		<MenuItem as="div" let:active>
			<a
				href={create({
					entity: 'expense',
					predefined: new Map([
						['portfolioId', data.property.portfolioId],
						['propertyId', data.property.id],
					]),
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsSolidCreditCard} />
					Create expense
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
