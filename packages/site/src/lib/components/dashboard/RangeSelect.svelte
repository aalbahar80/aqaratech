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
	current={$range}
	options={rangeOptions}
	on:select={(e) => {
		const value = e.detail.value;
		value && range.set(value);
	}}
/>
