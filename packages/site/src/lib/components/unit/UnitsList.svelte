<script lang="ts">
	import UnitCard from '$components/unit/UnitCard.svelte';
	import {
		faBath,
		faBed,
		faElevator,
		faMaximize,
	} from '@fortawesome/free-solid-svg-icons';
	import { Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

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
	export let readOnly = false;

	$: addUnitHref = `/new/units?propertyId=${units[0]?.propertyId}`;
</script>

<section class="overflow-hidden rounded-md bg-white shadow">
	{#if units.length}
		<!-- Section Heading -->
		<div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
			<div
				class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
			>
				<div class="ml-4 mt-2">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Units</h3>
				</div>
				{#if !readOnly}
					<div class="ml-4 mt-2 flex-shrink-0">
						<a
							href={addUnitHref}
							class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Create new unit
						</a>
					</div>
				{/if}
			</div>
		</div>

		<ul class="divide-y divide-gray-200">
			{#each units as unit (unit.id)}
				<!-- Check out dan-fns isWithinInterval() -->
				<!-- https://date-fns.org/v2.28.0/docs/isWithinInterval -->
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
		</ul>
	{:else}
		<!-- Empty State -->
		<div class="text-center py-8 sm:py-16">
			<svg
				class="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					vector-effect="non-scaling-stroke"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width={2}
					d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">No units</h3>

			{#if readOnly}
				<p class="mt-1 text-sm text-gray-500">Nothing here, yet.</p>
				<div class="mt-6" />
			{:else}
				<p class="mt-1 text-sm text-gray-500">
					Get started by creating a new unit.
				</p>
				<div class="mt-6">
					<a
						href={addUnitHref}
						class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<Icon src={Plus} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
						New Unit
					</a>
				</div>
			{/if}
		</div>
	{/if}
</section>
