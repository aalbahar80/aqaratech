<script lang="ts">
	import { page } from '$app/stores';
	import UnitCard from '$components/unit/UnitCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import FaSolidBath from '~icons/fa-solid/bath';
	import Fa6SolidBed from '~icons/fa6-solid/bed';
	import Fa6SolidElevator from '~icons/fa6-solid/elevator';
	import GisMeasure from '~icons/gis/measure';

	interface Unit {
		id: string;
		type: string | null;
		unitNumber: string;
		propertyId: string;
		bed: number | null;
		bath: number | null;
		floor: number | null;
		size: number | null;
		leases?: {
			end: Date;
			start: Date;
		}[];
	}
	export let units: Unit[];

	const createHref = $page.url.pathname.startsWith('/properties')
		? `/new/units?propertyId=${$page.url.pathname.split('/').pop()}`
		: '/new/units';
</script>

<StackedList entityTitle="units" count={units.length} {createHref}>
	{#each units as unit (unit.id)}
		{@const occupied =
			unit.leases?.some(
				(lease) => lease.end > new Date() && lease.start < new Date(),
			) ?? false}
		{@const icons = [
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
				label: `${unit.size?.toLocaleString()} m²`,
				tooltip: 'Size',
				icon: GisMeasure,
			},
			{
				label: unit.floor,
				icon: Fa6SolidElevator,
				tooltip: 'Elevator',
			},
		]}
		<li>
			<UnitCard {unit} {icons} {occupied} />
		</li>
	{/each}
</StackedList>
