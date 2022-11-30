<script lang="ts" context="module">
	import DateInput from '$lib/components/dashboard/filter/DateInput.svelte';
	import RangeSelect from '$lib/components/dashboard/filter/RangeSelect.svelte';
	import { range } from '$lib/stores/filter/range';
</script>

<div class="flex flex-col gap-2 md:flex-row md:gap-8">
	<div class="md:w-1/2">
		<RangeSelect />
	</div>

	<div class="flex gap-2 md:w-1/2 md:gap-8">
		<DateInput
			value={$range.start}
			on:change={(e) => {
				// @ts-expect-error until forwareded events are typed
				const value = e.currentTarget.value;

				void range.setDates(value, $range.end);
			}}
		/>

		<DateInput
			value={$range.end}
			on:change={(e) => {
				// @ts-expect-error until forwareded events are typed
				const value = e.currentTarget.value;

				void range.setDates($range.start, value);
			}}
		/>
	</div>
</div>
