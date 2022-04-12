<script lang="ts">
	import { getModel } from '$lib/models/interfaces/utils/get-model';

	interface Option {
		value: string | null;
		label: string;
	}
	type SelectedOption = Option | undefined;

	export let parent: Option | undefined = undefined;
	export let field: 'clientId' | 'propertyId' | 'unitId';
	export let current: SelectedOption = undefined;
	export let disabled = false;
	export let placeholder = '';

	const model = getModel(field);

	let options: Option[] = [];

	const getOptions = async (parent: Option | undefined) => {
		current = undefined;
		options = await model.getOptions(parent?.value ?? '');
	};

	$: getOptions(parent);
</script>

<!-- 
	@component 
	Prefetch all possible options and render a native html `<select>`
 -->
<select
	id={field}
	class={`${$$props.class} mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
	placeholder="abc"
	class:disabled
	{disabled}
	bind:value={current}
>
	{#if !current?.value}
		<option selected value={undefined}>{placeholder}</option>
	{/if}
	{#each options as option (option.value)}
		<option value={option} selected={option.value === current?.value}
			>{option.label}</option
		>
	{/each}
</select>

<style lang="postcss">
	.disabled {
		@apply cursor-not-allowed border-slate-200 bg-zinc-200 text-slate-500 shadow-none;
	}
</style>
