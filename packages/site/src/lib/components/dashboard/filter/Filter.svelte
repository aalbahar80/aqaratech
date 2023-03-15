<script lang="ts">
	import type {
		PaginatedPropertyDto,
		PaginatedUnitMinimalDto,
	} from '$api/openapi';

	import DateFilter from '$lib/components/dashboard/filter/DateFilter.svelte';
	import PropertySelect from '$lib/components/dashboard/filter/PropertySelect.svelte';
	import UnitSelect from '$lib/components/dashboard/filter/UnitSelect.svelte';

	export let hideRange = false;
	export let hideProperty = false;
	export let properties: PaginatedPropertyDto;
	export let units: PaginatedUnitMinimalDto;
</script>

<div
	class="grid h-full grid-cols-2 gap-8 gap-x-2 rounded-lg bg-white p-4 shadow md:gap-8"
>
	{#if !hideRange}
		<div class="col-span-full">
			<DateFilter />
		</div>
	{/if}

	{#if !hideProperty}
		<div>
			<PropertySelect items={properties.results} />
		</div>

		<div>
			<UnitSelect items={units.results} />
		</div>
	{/if}
</div>
