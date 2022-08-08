<script lang="ts">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import { create } from '$lib/utils/route-helpers';
	import type { UnitDto } from '@self/sdk';
	import { CreditCard } from '@steeze-ui/heroicons';
	import FaSolidBath from '~icons/fa-solid/bath';
	import Fa6SolidBed from '~icons/fa6-solid/bed';
	import Fa6SolidStairs from '~icons/fa6-solid/stairs';
	import GisMeasure from '~icons/gis/measure';

	export let unit: UnitDto;

	$: details = [
		...(unit.label ? [['Label', unit.label]] : []),
		['Unit Number', unit.unitNumber],
		['Type', unit.type],
		['Market Rent', kwdFormat(unit.marketRent)],
		['Usage', unit.usage],
	] as [string, string | null][];

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

<Heading
	title="Unit"
	id={unit.id}
	entity="units"
	{icons}
	extraMenuItems={[
		{
			icon: CreditCard,
			label: 'Create expense',
			href: create({
				entity: 'expenses',
				predefined: new Map([
					['portfolioId', unit.breadcrumbs.portfolio.id],
					['propertyId', unit.propertyId],
					['unitId', unit.id],
				]),
			}),
		},
	]}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={unit.breadcrumbs} />
	</svelte:fragment>
</Heading>

<DetailsPane {details} />
<slot />
