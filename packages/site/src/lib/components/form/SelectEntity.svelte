<script lang="ts">
	import { browser } from '$app/env';
	import { relationalClassMap } from '$lib/models/classes/all.class';
	import type {
		Option,
		SelectedOption,
	} from '$lib/models/interfaces/option.interface';
	import type { Relation } from '$lib/models/types/entity.type';
	import { createEventDispatcher } from 'svelte';
	import { createMyCustomStore } from './SelectStore';

	export let parent: SelectedOption = undefined;
	export let selected: SelectedOption = undefined;
	export let field: Relation;
	export let disabled = false;
	export let title: string | undefined = undefined;
	export let hideLabel = false;
	export let invalid = false;
	export let invalidText = '';

	const cstor = relationalClassMap[field];

	const dispatch = createEventDispatcher<{
		select: Option;
	}>();

	let options = createMyCustomStore(cstor, selected ? [selected] : []);

	$: {
		if (browser) {
			// fetching needs to be in onMount or in load. Otherwise, cookies won't be passed to trpc and app will crash/error out.
			options.fetchData(parent?.value);
		}
	}
</script>

<!-- 
	@component 
	Prefetch all possible options and render a native html `<select>`
 -->
<div>
	{#if !hideLabel}
		<label for={field} class="block text-sm font-medium text-gray-700">
			{title ?? cstor.singularCap}
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
			dispatch('select', selected);
		}}
	>
		{#each $options as option (option.value)}
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
