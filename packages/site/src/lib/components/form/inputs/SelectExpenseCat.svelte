<script lang="ts">
	import Select from '$components/Select.svelte';
	import { expenseCats } from '$lib/config/constants';

	export let value: any;

	const baseOption = {
		value: '',
		label: '',
	};

	const categoryOptions = expenseCats.map((cat) => ({
		label: `${cat.en} - ${cat.ar}`,
		value: cat.en,
	}));

	$: options = [baseOption, ...categoryOptions];
</script>

<Select id="expenseCategoryId" current={value} {options} on:select />
