<script lang="ts">
	import UnitCard from '$components/unit/UnitCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import {
		faBath,
		faBed,
		faElevator,
		faMaximize,
	} from '@fortawesome/free-solid-svg-icons';

	interface Unit {
		id: string;
		type: string | null;
		unitNumber: string;
		propertyId: string;
		bed: number | null;
		bath: number | null;
		floor: number | null;
		size: number | null;
		leases: {
			end: Date;
		}[];
	}
	export let units: Unit[];

	$: addUnitHref = `/new/units?propertyId=${units[0]?.propertyId}`;
</script>

<StackedList entity="units" count={units.length}>
	{#each units as unit (unit.id)}
		<!-- Check out dan-fns isWithinInterval()
		https://date-fns.org/v2.28.0/docs/isWithinInterval -->
		{@const occupied = unit.leases.some((lease) => lease.end > new Date())}
		{@const icons = [
			{
				label: unit.bed,
				icon: faBed,
				tooltip: 'Bedrooms',
			},
			{
				label: unit.bath,
				icon: faBath,
				tooltip: 'Bathrooms',
			},
			{
				label: unit.floor,
				icon: faElevator,
				tooltip: 'Elevator',
			},
			{
				label: `${unit.size?.toLocaleString()} m²`,
				icon: faMaximize,
				tooltip: 'Size',
			},
		]}
		<li>
			<UnitCard {unit} {icons} {occupied} />
		</li>
	{/each}
</StackedList>
