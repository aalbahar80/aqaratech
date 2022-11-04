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
	import { page } from '$app/stores';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import type { NavigationItem } from '$lib/components/sidebar/types';
	import { clickOutside } from '$lib/utils/click-outside';
	import clsx from 'clsx';
	import { fly } from 'svelte/transition';

	export let navigationTree: NavigationItem[];
</script>

<aside
	class={clsx(
		'fixed z-40 h-screen w-64 flex-col border-r bg-white px-4 py-8 dark:border-gray-700 dark:bg-gray-900',
		$isOpen ? 'flex' : 'hidden',
	)}
	in:fly={{ x: -100, duration: 150 }}
	use:clickOutside
	on:outclick={closeSidebar}
>
	<!-- Search -->
	{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
		<!-- TODO extract to own component -->
		<div class="relative mt-6">
			<span class="absolute inset-y-0 left-0 flex items-center pl-3">
				<svg class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none">
					<path
						d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>

			<input
				type="text"
				class="w-full rounded-md border bg-white py-2 pl-10 pr-4 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
				placeholder="Search"
			/>
		</div>
	{/if}

	<div class="mt-6 flex flex-1 flex-col justify-between">
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
