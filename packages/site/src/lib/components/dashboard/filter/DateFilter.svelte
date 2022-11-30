<script lang="ts" context="module">
	import DateInput from '$lib/components/dashboard/filter/DateInput.svelte';
	import RangeSelect from '$lib/components/dashboard/filter/RangeSelect.svelte';
	import { range } from '$lib/stores/filter/range';
</script>

<RangeSelect />

<DateInput
	value={$range.start}
	on:change={(e) => {
		const value = e.currentTarget.value;

		void range.setDates(value, $range.end);
	}}
/>

<DateInput
	value={$range.end}
	on:change={(e) => {
		const value = e.currentTarget.value;

		void range.setDates($range.start, value);
	}}
/>
