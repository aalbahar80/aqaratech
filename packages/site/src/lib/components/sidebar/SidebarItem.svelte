<script lang="ts">
	import ArrowIcon from '$lib/components/sidebar/ArrowIcon.svelte';
	import type { NavigationItem } from '$lib/components/sidebar/types';

	export let item: NavigationItem;
</script>

<a
	class="mt-5 flex transform items-center rounded-md px-4 py-2 text-gray-600 transition-colors duration-100 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
	href={item.href}
>
	<svelte:component this={item.icon} class="h-5 w-5" />

	<span class="mx-4 font-medium">{item.name}</span>

	{#if item.children?.length > 0}
		<ArrowIcon />
	{/if}
</a>

{#if item.children?.length > 0}
	{#each item.children as child}
		<svelte:self item={child} />
	{/each}
{/if}
