<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	const isOpen = writable(false);

	export const closeSidebar = () => {
		console.log('Closing sidebar'); // TODO rm
		isOpen.set(false);
	};

	export const openSidebar = () => {
		console.log('Opening sidebar'); // TODO rm
		isOpen.set(true);
	};
</script>

<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import SearchButton from '$lib/components/search/SearchButton.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import type { NavigationItem } from '$lib/components/sidebar/types';
	import { clickOutside } from '$lib/utils/click-outside';
	import clsx from 'clsx';
	import { fly } from 'svelte/transition';

	export let navigationTree: NavigationItem[];

	// Close sidebar after navigation
	afterNavigate(() => {
		closeSidebar();
	});
</script>

<aside
	class={clsx(
		'fixed z-40 h-screen w-64 flex-col gap-6 border-r bg-white px-4 py-8 pt-28 dark:border-gray-700 dark:bg-gray-900',
		$isOpen ? 'flex' : 'hidden lg:flex', // ignore $isOpen on lg breakpoint
	)}
	in:fly={{ x: -100, duration: 150 }}
	use:clickOutside
	on:outclick={closeSidebar}
>
	{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
		<SearchButton />
	{/if}

	<div class="flex flex-1 flex-col justify-between">
		<nav>
			{#each navigationTree as item}
				{#if item.divided}
					<hr class="my-6 border-gray-200 dark:border-gray-600" />
				{/if}

				<SidebarItem {item} />
			{/each}
		</nav>
	</div>
</aside>
