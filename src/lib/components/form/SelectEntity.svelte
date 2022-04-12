<script lang="ts">
	import { getModel } from '$lib/models/interfaces/utils/get-model';

	interface Option {
		value: string | null;
		label: string;
	}
	type Value = string | null;

	export let parentId: Value = '';
	export let field: 'clientId' | 'propertyId' | 'unitId';
	export let current: Value;
	export let disabled = false;
	export let placeholder = '';

	const model = getModel(field);

	let options: Option[] = [];

	$: console.log({ current }, 'SelectEntity.svelte ~ 21');
	const getOptions = async (parent: Value) => {
		options = [{ value: '', label: placeholder }];
		current = '';
		const newOptions = await model.getOptions(parent ?? '');
		options = [{ value: '', label: placeholder }, ...newOptions];
	};

	$: getOptions(parentId);
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
	{#each options as { label, value }}
		<option {value} selected={value === current}>{label}</option>
	{/each}
</select>

<style lang="postcss">
	.disabled {
		@apply cursor-not-allowed border-slate-200 bg-zinc-200 text-slate-500 shadow-none;
	}
</style>
