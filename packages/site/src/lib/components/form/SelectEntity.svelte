<script lang="ts">
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/common/option.interface';
	import {
		getModel,
		type RelationalField,
	} from '$lib/models/interfaces/utils/get-model';
	import { createEventDispatcher, onMount } from 'svelte';

	export let initialParent: string | undefined = undefined;
	export let field: RelationalField;
	export let selected: SelectedOption = undefined;
	export let disabled = false;
	export let title: string | undefined = undefined;
	export let hideLabel = false;
	export let invalid = false;
	export let invalidText = '';

	/** The `id` of the initial value. Label will be set once `getOptions` completes in onMount. */
	export let initialValue: string | undefined = undefined;

	export const clear = () => {
		selected = undefined;
		dispatch('select', selected);
	};

	const model = getModel(field);

	let options: Option[] = selected ? [selected] : [];

	export const getOptions = async (parentId: string | undefined | null) => {
		if (model.name !== 'clients' && model.name !== 'leases') {
			options = await model.getOptions({
				parentId: parentId ?? undefined,
			});
		} else {
			options = [...(await model.getOptions())];
		}
		selected = options.find((option) => option.value === selected?.value);
	};

	onMount(async () => {
		await getOptions(initialParent);
		if (initialValue) {
			selected = options.find((option) => option.value === initialValue);
		}
	});

	const dispatch = createEventDispatcher<{
		select: Option['value'];
	}>();
</script>

<!-- 
	@component 
	Prefetch all possible options and render a native html `<select>`
 -->
<div>
	{#if !hideLabel}
		<label for={field} class="block text-sm font-medium text-gray-700">
			{title ?? model.singularCap}
		</label>
	{/if}
	<select
		id={field}
		class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
		class:invalid-select={invalid}
		class:disabled
		{disabled}
		bind:value={selected}
		on:change={() => {
			dispatch('select', selected?.value);
		}}
	>
		{#each options as option (option.value)}
			<option value={option}>{option.label}</option>
		{/each}
	</select>
	{#if invalid}
		<p class="mt-2 text-sm text-red-600" id={`${field}-error`}>
			{invalidText ?? ''}
		</p>
	{/if}
</div>

<style lang="postcss">
	.disabled {
		@apply cursor-not-allowed border-slate-200 bg-zinc-200 text-slate-500 shadow-none;
	}
	.invalid-select {
		@apply border-pink-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
