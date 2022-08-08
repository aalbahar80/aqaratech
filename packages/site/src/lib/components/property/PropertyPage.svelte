<script lang="ts">
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { create } from '$lib/utils/route-helpers';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import type { PropertyDto } from '@self/sdk';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';

	export let property: PropertyDto;

	$: details = [
		...(property.label ? [['Label', property.label]] : []),
		['Address', property.breadcrumbs.property.label],
		['Area', property.area],
		['Block', property.block],
		['Avenue', property.avenue],
		['Street', property.street],
		['Number', property.number],
		['Parcel', property.parcel],
		['Paci', property.paci],
	] as [string, string | null][];
</script>

<Heading title="Property" id={property.id} entity="properties">
	<div slot="menu-items">
		<MenuItem as="div" let:active>
			<a
				href={create({
					entity: 'expenses',
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

<DetailsPane {details} />
<slot />
