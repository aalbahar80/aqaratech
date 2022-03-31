<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	type T = $$Generic;
	type Option = {
		label: string;
		value: T;
		disabled?: boolean;
	};
	export let title = '';
	export let options: Option[];
	export let current: T;
	export let disabled = false;

	const dispatch = createEventDispatcher<{
		select: { value: string };
	}>();
</script>

{#if title}
	<label for="group-by" class="block text-sm font-medium text-gray-700">
		{title}
	</label>
{/if}
<select
	id="group-by"
	name="group-by"
	class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
	class:disabled
	{disabled}
	bind:value={current}
	on:change={(e) => dispatch('select', { value: e.currentTarget.value })}
>
	{#each options as { label, value, disabled }}
		<option {value} selected={value === current} {disabled}>{label}</option>
	{/each}
</select>

<style lang="postcss">
	.disabled {
		@apply cursor-not-allowed opacity-50;
	}
</style>
