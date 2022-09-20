<script lang="ts">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { create } from '$lib/utils/route-helpers';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import type { UnitDto } from '$api/openapi';
	import FaSolidBath from '~icons/fa-solid/bath';
	import Fa6SolidBed from '~icons/fa6-solid/bed';
	import Fa6SolidStairs from '~icons/fa6-solid/stairs';
	import GisMeasure from '~icons/gis/measure';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';

	export let unit: UnitDto;

	const icons = [
		{
			label: unit.bed,
			icon: Fa6SolidBed,
			tooltip: 'Bedrooms',
		},
		{
			label: unit.bath,
			icon: FaSolidBath,
			tooltip: 'Bathrooms',
		},
		{
			label:
				typeof unit.size === 'number'
					? `${unit.size?.toLocaleString()} m²`
					: unit.size,
			tooltip: 'Size',
			icon: GisMeasure,
		},
		{
			label: unit.floor,
			icon: Fa6SolidStairs,
			tooltip: 'Floor',
		},
	];
</script>

<Heading title="Unit" id={unit.id} entity="unit" {icons}>
	<div slot="menu-items">
		<MenuItem as="div" let:active>
			<a
				href={create({
					entity: 'expense',
					predefined: new Map([
						['portfolioId', unit.breadcrumbs.portfolio.id],
						['propertyId', unit.propertyId],
						['unitId', unit.id],
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
		<BreadCrumb crumbs={unit.breadcrumbs} />
	</svelte:fragment>
</Heading>
