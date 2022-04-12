<script lang="ts">
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/common/option.interface';
	import {
		getModel,
		type RelationalField,
	} from '$lib/models/interfaces/utils/get-model';

	export let parent: SelectedOption = undefined;
	export let field: RelationalField;
	export let current: SelectedOption = undefined;
	export let disabled = false;
	export let placeholder = '';

	const model = getModel(field);

	let options: Option[] = [];

	const getOptions = async (parent: Option | undefined) => {
		current = undefined;
		if (model.name !== 'clients' && model.name !== 'leases') {
			options = await model.getOptions({
				parentId: parent?.value ?? undefined,
			});
			options = await model.getOptions({});
		}
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
