<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type T = $$Generic;
	type Option = {
		label: string;
		value: T;
		disabled?: boolean;
	};
	export let id: string | undefined = undefined;
	export let title = '';
	export let options: Option[];
	export let current: T;
	export let disabled = false;

	const dispatch = createEventDispatcher<{
		select: { value: typeof current };
	}>();
</script>

{#if title}
	<label for={title} class="block text-sm font-medium text-gray-700">
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
