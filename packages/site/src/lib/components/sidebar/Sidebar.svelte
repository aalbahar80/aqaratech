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
	import SearchPalette from '$lib/components/search/SearchPalette.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import type { NavigationItem } from '$lib/components/sidebar/types';
	import { clickOutside } from '$lib/utils/click-outside';
	import { shortcut } from '$lib/utils/shortcut';
	import clsx from 'clsx';
	import { fly } from 'svelte/transition';

	export let navigationTree: NavigationItem[];

	// Close sidebar after navigation
	afterNavigate(() => {
		closeSidebar();
	});

	let open = false;
</script>

<aside
	class={clsx(
		'fixed z-40 h-screen w-64 flex-col gap-6 border-r bg-white px-4 py-8 dark:border-gray-700 dark:bg-gray-900',
		$isOpen ? 'flex' : 'hidden lg:flex', // ignore $isOpen on lg breakpoint
	)}
	in:fly={{ x: -100, duration: 150 }}
	use:clickOutside
	on:outclick={closeSidebar}
>
	<!-- Search -->
	<!-- TODO extract to own component -->
	{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
		<button
			class="flex w-full items-center rounded-md border bg-white p-2 text-gray-700 hover:border-blue-400 hover:outline-none hover:ring hover:ring-blue-300 hover:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-300"
			use:shortcut={{ control: true, code: 'KeyK' }}
			on:click={() => {
				open = true;
			}}
		>
			<svg
				class="mr-3 h-5 w-5 flex-none text-gray-400"
				viewBox="0 0 24 24"
				fill="none"
			>
				<path
					d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>

			Search
			<kbd class="ml-auto flex-none pl-3 font-sans">
				<abbr title="Command" class="no-underline">⌘</abbr> K
			</kbd>
		</button>
		<SearchPalette bind:open />
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
