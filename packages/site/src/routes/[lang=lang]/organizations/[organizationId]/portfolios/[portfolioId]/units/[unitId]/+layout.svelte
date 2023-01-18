<script lang="ts">
	import { MenuItem } from '@rgossiaux/svelte-headlessui';

	import { page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { getRoute, PageTab, PageType } from '@self/utils';

	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import L, { locale } from '$i18n/i18n-svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import UnitTabs from '$lib/components/unit/UnitTabs.svelte';
	import { fmtNumber } from '$lib/i18n/format';
	import FaSolidBath from '~icons/fa-solid/bath';
	import Fa6SolidBed from '~icons/fa6-solid/bed';
	import Fa6SolidStairs from '~icons/fa6-solid/stairs';
	import GisMeasure from '~icons/gis/measure';
	import HeroiconsWrench from '~icons/heroicons/wrench';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';

	export let data: LayoutData;

	const icons = [
		{
			label: data.unit.bed ? fmtNumber(data.unit.bed) : data.unit.bed,
			icon: Fa6SolidBed,
			tooltip: 'Bedrooms',
		},
		{
			label: data.unit.bath ? fmtNumber(data.unit.bath) : data.unit.bath,
			icon: FaSolidBath,
			tooltip: 'Bathrooms',
		},
		{
			label:
				typeof data.unit.size === 'number'
					? new Intl.NumberFormat($locale, {
							style: 'unit',
							unit: 'meter',
							unitDisplay: 'short',
					  }).format(data.unit.size)
					: data.unit.size,
			tooltip: 'Size',
			icon: GisMeasure,
		},
		{
			label: data.unit.floor ? fmtNumber(data.unit.floor) : data.unit.floor,
			icon: Fa6SolidStairs,
			tooltip: 'Floor',
		},
	];
</script>

<Heading
	title={$L.entity.unit.singular()}
	id={data.unit.id}
	entity="unit"
	{icons}
	onDelete={async (api) => {
		await api.units.remove({ id: data.unit.id });

		const url = getRoute({
			entity: 'property',
			id: data.unit.propertyId,
			pageType: PageTab.Units,
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
					params: $page.params,
					pageType: PageType.New,
					predefined: {
						unitId: data.unit.id,
					},
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsSolidCreditCard} />
					{$L.buttons.new() + ' ' + $L.entity.expense.singular()}
				</MenuItemChild>
			</a>
		</MenuItem>
		<MenuItem as="div" let:active>
			<a
				href={getRoute({
					entity: 'maintenanceOrder',
					pageType: PageType.New,
					params: $page.params,
					predefined: {
						unitId: data.unit.id,
					},
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsWrench} />
					{$L.buttons.new() + ' ' + $L.entity.maintenanceOrder.singular()}
				</MenuItemChild>
			</a>
		</MenuItem>
	</div>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={data.unit.breadcrumbs} />
	</svelte:fragment>
</Heading>

<UnitTabs />

<slot />
