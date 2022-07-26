<script lang="ts">
	import { classes } from '$lib/utils/classes';
	import type { SvelteComponentTyped } from 'svelte';

	interface MenuOption {
		label: string;
		icon?: typeof SvelteComponentTyped<svelte.JSX.IntrinsicElements['svg']>;
	}

	export let option: MenuOption;
	export let active: boolean;
</script>

<div
	class={classes(
		active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
		'group flex items-center px-4 py-2 text-sm',
	)}
>
	{#if option.icon}
		<svelte:component
			this={option.icon}
			class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
			aria-hidden="true"
		/>
	{/if}
	{option.label}
</div>
