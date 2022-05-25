<script lang="ts">
	import Select from '$components/Select.svelte';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import { onMount } from 'svelte';

	export let value: any;

	let categories:
		| InferQueryOutput<'public:expenses:meta'>['categories']
		| undefined;

	onMount(async () => {
		const meta = await trpc().query('public:expenses:meta');
		categories = meta.categories;
	});

	const baseOption = {
		value,
		label: value,
	};

	$: categoryOptions =
		categories !== undefined
			? categories.map((cat) => ({
					label: `${cat.en} - ${cat.ar}`,
					value: cat.id,
			  }))
			: [];

	$: options = [baseOption, ...categoryOptions];
</script>

<Select id="expenseCategoryId" current={value} {options} on:select />
