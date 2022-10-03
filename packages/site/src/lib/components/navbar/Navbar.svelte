<script lang="ts">
	import { page } from '$app/stores';
	import NavPopover from '$components/navbar/NavPopover.svelte';
	import DashboardButton from '$lib/components/navbar/DashboardButton.svelte';
	import LoginButton from '$lib/components/navbar/LoginButton.svelte';
	import NavbarDropdown from '$lib/components/navbar/NavbarDropdown.svelte';
	import NavbarIcon from '$lib/components/navbar/NavbarIcon.svelte';
	import SearchButton from '$lib/components/search/SearchButton.svelte';

	// Needs to be reactive?
	$: navigation = $page.data.user?.role?.meta.navLinks || [];
</script>

<div class="bg-gray-900 py-1.5 print:hidden">
	<nav
		class="relative mx-auto flex max-w-7xl items-center justify-between gap-x-4 px-4 sm:px-6"
		aria-label="Global"
	>
		<NavbarIcon />

		<div
			class="hidden flex-auto space-x-4 justify-self-start lg:ml-10 lg:flex "
		>
			<DashboardButton />
			<!-- Large screen: nav links -->
			{#each navigation as item (item.label)}
				<a
					data-sveltekit-prefetch
					href={item.href}
					class="flex rounded-md py-3 px-4 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
				>
					{item.label}
				</a>
			{/each}
		</div>

		{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
			<SearchButton />
		{/if}

		{#if $page.data.user}
			<div class="hidden lg:flex lg:items-center lg:space-x-6">
				<NavbarDropdown />
			</div>
		{:else}
			<LoginButton />
		{/if}

		<div
			class="-mr-2 flex items-center gap-6 lg:hidden"
			class:hidden={!$page.data.user}
		>
			<NavPopover {navigation} />
		</div>
	</nav>
</div>
