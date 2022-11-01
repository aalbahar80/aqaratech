<script lang="ts">
	import { classes } from '$lib/utils/classes';
	import type { SvelteComponentTyped } from 'svelte';

	export let icon: typeof SvelteComponentTyped<
		svelte.JSX.IntrinsicElements['svg']
	>;
	export let current: boolean;
</script>

<div
	class={classes(
		current
			? 'border-indigo-500 text-indigo-600'
			: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
		'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium',
	)}
	aria-current={current ? 'page' : undefined}
>
	<svelte:component
		this={icon}
		class={classes(
			current ? 'text-indigo-500' : 'text-gray-400 group-hover:text-gray-500',
			'-ml-0.5 mr-2 h-5 w-5',
		)}
		aria-hidden="true"
	/>
	<slot />
</div>
