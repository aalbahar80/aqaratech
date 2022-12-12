<script lang="ts" context="module">
	import { createDisclosure } from 'svelte-headlessui';

	export const sidebar = createDisclosure({
		label: 'Sidebar',
		expanded: false,
	});
</script>

<script lang="ts">
	import clsx from 'clsx';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { fly } from 'svelte/transition';

	import { clickOutside } from '$lib/actions/click-outside';
	import SearchButton from '$lib/components/search/SearchButton.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import type { NavigationItem } from '$lib/components/sidebar/types';

	export let navigationTree: NavigationItem[];

	// Close sidebar after navigation
	afterNavigate(() => {
		sidebar.close();
	});
</script>

<aside
	class={clsx(
		'fixed z-40 h-[calc(100%-100px)] w-64 flex-col gap-6 border-r bg-white px-4 py-8 dark:border-gray-700 dark:bg-gray-900',
		$sidebar.expanded ? 'flex' : 'hidden lg:flex', // ignore $isOpen on lg breakpoint
	)}
	in:fly={{ x: -100, duration: 150 }}
	use:sidebar.panel
	use:clickOutside
	on:outclick={sidebar.close}
>
	{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
		<SearchButton />
	{/if}

	<nav class="flex flex-1 flex-col overflow-y-auto overscroll-y-contain">
		{#each navigationTree as item}
			{#if item.divided}
				<hr class="my-6 border-gray-200 dark:border-gray-600" />
			{/if}

			<SidebarItem {item} />
		{/each}
	</nav>
</aside>
