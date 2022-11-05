<script lang="ts">
	import type { PropertyDto } from '$api/openapi';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyTabs from '$lib/components/property/PropertyTabs.svelte';
	import { create } from '$lib/utils/route-helpers';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';

	export let property: PropertyDto;
</script>

<Heading title="Property" id={property.id} entity="property">
	<div slot="menu-items">
		<MenuItem as="div" let:active>
			<a
				href={create({
					entity: 'expense',
					predefined: new Map([
						['portfolioId', property.portfolioId],
						['propertyId', property.id],
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
		<BreadCrumb crumbs={property.breadcrumbs} />
	</svelte:fragment>
</Heading>

<PropertyTabs />
