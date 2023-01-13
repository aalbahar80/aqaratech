<script lang="ts" context="module">
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { range } from '$lib/stores/filter/range';
</script>

<script lang="ts">
	import L from '$i18n/i18n-svelte';

	// TODO: hide custom range option unless custom range is selected
	const rangeOptions = [
		{ value: 0, label: $L.filter.monthToDate() },
		{ value: 3, label: $L.filter.last3Months() },
		{ value: 6, label: $L.filter.last6Months() },
		{ value: 12, label: $L.filter.last12Months() },
		{ value: null, label: $L.filter.custom() },
	];
</script>

<Select
	title={$L.filter.range()}
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
