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
	title="Range"
	current={$range.months}
	options={rangeOptions}
	on:select={(e) => {
		const value = e.detail.value;

		// only check for null value. 0 is a valid value.
		if (value !== null) {
			void range.setMonths(value);
		}
	}}
/>
