<script lang="ts">
	import clsx from 'clsx';

	import { createEventDispatcher } from 'svelte';

	type T = $$Generic;
	interface Option {
		label: string;
		value: T;
		disabled?: boolean;
	}
	export let id: string | undefined = undefined;
	export let title = '';
	export let options: Option[];
	export let current: T;
	export let disabled = false;
	export let hideLabel = false;

	const dispatch = createEventDispatcher<{
		select: { value: typeof current };
	}>();
</script>

{#if title}
	<label
		for={title}
		class={clsx(
			'block pb-2 text-sm font-medium text-gray-700',
			hideLabel && 'sr-only',
		)}
	>
		{title}
	</label>
{/if}
<select
	id={title || id}
	name={id}
	class={`${$$props.class} block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
	class:disabled
	{disabled}
	bind:value={current}
	on:change={() => dispatch('select', { value: current })}
>
	{#each options as { label, value, disabled }}
		<option {value} selected={value === current} {disabled}>{label}</option>
	{/each}
</select>

<style lang="postcss">
	.disabled {
		@apply cursor-not-allowed border-slate-200 bg-zinc-200 text-slate-500 shadow-none;
	}
</style>
