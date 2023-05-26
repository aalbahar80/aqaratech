<script
	lang="ts"
	context="module"
>
	import { createDisclosure } from 'svelte-headlessui';

	export const sidebar = createDisclosure({
		label: 'Sidebar',
		expanded: false,
	});
</script>

<script lang="ts">
	import clsx from 'clsx';
	import * as R from 'remeda';

	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	import type { NavigationItem } from '$lib/components/sidebar/types';

	import { clickOutside } from '$lib/actions/click-outside';
	import SearchButton from '$lib/components/search/SearchButton.svelte';
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';
	import VersionFooter from '$lib/components/VersionFooter.svelte';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';
	import { isHomeRoute, isSidebarAvailable } from '$lib/utils/route-utils';

	export let navigationTree: NavigationItem[];

	$: [iconNavTree, navTree] = R.partition(navigationTree, (n) => 'navKey' in n);

	// Close sidebar after navigation
	afterNavigate(() => {
		sidebar.close();
	});
</script>

<aside
	class={clsx(
		'fixed z-40 h-[calc(100%-68px)] w-64 flex-col gap-6 border-r bg-white px-4 py-8 dark:border-gray-700 dark:bg-gray-900 sm:h-[calc(100%-100px)]',
		$sidebar.expanded ? 'flex' : 'hidden lg:flex', // ignore $isOpen on lg breakpoint
	)}
	class:sb:hidden={!isSidebarAvailable($page.route)}
	use:sidebar.panel
	use:clickOutside
	on:outclick={sidebar.close}
>
	{#if !isHomeRoute($page.route)}
		<RoleGuard roles={['ORGADMIN', 'PORTFOLIO']}>
			<SearchButton />
		</RoleGuard>
	{/if}

	<nav
		class="flex flex-1 flex-col justify-between overflow-y-auto overscroll-y-contain"
	>
		<div>
			{#each navTree as item}
				{#if item.divided}
					<hr class="my-6 border-gray-200 dark:border-gray-600" />
				{/if}

				<SidebarItem {item} />
			{/each}
		</div>

		<!-- Horizontal icon buttons -->
		<div class="flex flex-row justify-between px-4 pt-8">
			{#each iconNavTree as item}
				<svelte:element
					this={item.isButton ? 'button' : 'a'}
					href={item.isButton ? 'false' : item.href}
					on:click={item.onClick}
					{...item.linkOptions}
					aria-label={item.name}
				>
					<svelte:component
						this={item.icon}
						class="h-5 w-5 text-gray-700 hover:text-gray-900"
					/>
				</svelte:element>
			{/each}
		</div>
	</nav>
	<VersionFooter />
</aside>
