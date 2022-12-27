<script lang="ts">
	import clsx from 'clsx';

	import { page } from '$app/stores';

	import ArrowIcon from '$lib/components/sidebar/ArrowIcon.svelte';

	import type { NavigationItem } from '$lib/components/sidebar/types';

	export let item: NavigationItem;
	export let expanded = false;
	export let isChild = false;

	// expand the sidebar item if the current page is a child of the item
	// only runs once
	if (item.children?.some((child) => child.href === $page.url.pathname)) {
		expanded = true;
	}

	$: isCurrent = $page.url.pathname === item.href;
</script>

<div
	class={clsx(
		'flex items-center rounded-md px-4',
		isCurrent && !item.children?.length
			? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200'
			: 'transform text-gray-600 transition-colors duration-100 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200',
		isChild ? 'mt-2' : 'mt-5',
	)}
>
	<a
		class="inline-flex grow py-2"
		href={item.href}
		on:click={() => {
			// always expand when clicking on a link
			expanded = true;
		}}
		{...item.linkOptions}
	>
		{#if item.icon}
			<svelte:component this={item.icon} class="h-5 w-5" />
		{:else}
			<!--	 whitespace to align text	 -->
			<span class="h-5 w-5" />
		{/if}

		<span class="mx-4 font-medium">{item.name}</span>
	</a>

	{#if item.children && item.children?.length > 0}
		<button
			class="ml-auto focus:outline-none"
			on:click={() => {
				expanded = !expanded;
			}}
		>
			<ArrowIcon {expanded} />
		</button>
	{/if}
</div>
{#if item.children && expanded}
	{#each item.children as child}
		<svelte:self item={child} isChild />
	{/each}
{/if}
