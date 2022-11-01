<script lang="ts">
	import type { SvelteComponentTyped } from 'svelte';

	export let icon:
		| typeof SvelteComponentTyped<svelte.JSX.IntrinsicElements['svg']>
		| undefined = undefined;
</script>

<div
	class="inline-flex justify-end gap-x-2 text-indigo-600 hover:text-indigo-900"
>
	{#if icon}
		<svelte:component this={icon} class="h-4 w-4 flex-shrink-0" />
	{/if}
	<slot />
</div>
