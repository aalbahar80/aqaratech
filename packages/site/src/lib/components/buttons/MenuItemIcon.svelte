<script lang="ts">
	import { classes } from '$lib/utils/classes';

	import type { SvelteComponentTyped } from 'svelte';

	export let icon: typeof SvelteComponentTyped<
		svelte.JSX.IntrinsicElements['svg']
	>;
	export let disabled = false;
</script>

<svelte:component
	this={icon}
	class={classes(
		'mr-3 h-5 w-5 text-gray-400',
		disabled ? '' : 'group-hover:text-gray-500',
	)}
	aria-hidden="true"
/>
