<script lang="ts">
	import DateFilter from '$lib/components/dashboard/DateFilter.svelte';
	import LocationFilter from '$lib/components/dashboard/LocationFilter.svelte';
	import type { PropertyDto, UnitDto } from '$api/openapi';

	export let properties: PropertyDto[];
	export let units: UnitDto[];
	export let disabledPropertySelector = false;
	export let disabledUnitSelector = false;
</script>

<div
	class="z-10 flex flex-col justify-between gap-3 bg-gray-100 bg-opacity-20 pb-0.5 pt-4 backdrop-blur md:sticky md:top-0 md:flex-row"
>
	<DateFilter />

	<LocationFilter
		{properties}
		{units}
		{disabledPropertySelector}
		{disabledUnitSelector}
	/>
</div>
