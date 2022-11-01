<script lang="ts" context="module">
	import Select from '$lib/components/form/inputs/Select.svelte';
	import { range } from '$lib/stores/range';

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
