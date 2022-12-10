<script lang="ts">
	import type { Icon } from '$lib/models/types/icon.type';

	export let icon: Icon | undefined = undefined;
</script>

<div
	class="inline-flex justify-end gap-x-2 text-indigo-600 hover:text-indigo-900"
>
	{#if icon}
		<svelte:component this={icon} class="h-4 w-4 flex-shrink-0" />
	{/if}
	<slot />
</div>
