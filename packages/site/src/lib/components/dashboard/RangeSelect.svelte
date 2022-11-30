<script lang="ts" context="module">
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { range } from '$lib/stores/filter/range';

	// TODO: hide custom range option unless custom range is selected
	const rangeOptions = [
		{ value: 0, label: 'Month to date' },
		{ value: 3, label: 'Last 3 months' },
		{ value: 6, label: 'Last 6 months' },
		{ value: 12, label: 'Last 12 months' },
		{ value: null, label: 'Custom' },
	];
</script>

<Select
	current={$range.months}
	options={rangeOptions}
	on:select={async (e) => {
		const value = e.detail.value;

		if (value) {
			await range.setMonths(value);
		}
	}}
/>

<input
	type="date"
	value={$range.start}
	on:change={(e) => {
		const value = e.currentTarget.value;

		void range.setDates(value, $range.end);
	}}
/>

<input
	type="date"
	value={$range.end}
	on:change={(e) => {
		const value = e.currentTarget.value;

		void range.setDates($range.start, value);
	}}
/>
