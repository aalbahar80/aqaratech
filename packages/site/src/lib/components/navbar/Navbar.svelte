<script lang="ts">
	import { session } from '$app/stores';
	import NavPopover from '$components/navbar/NavPopover.svelte';
	import DashboardButton from '$lib/components/navbar/DashboardButton.svelte';
	import LoginButton from '$lib/components/navbar/LoginButton.svelte';
	import NavbarDropdown from '$lib/components/navbar/NavbarDropdown.svelte';
	import NavbarIcon from '$lib/components/navbar/NavbarIcon.svelte';

	// Needs to be reactive?
	const navigation = $session.user?.role?.meta.navLinks || [];
</script>

<div class="bg-gray-900 py-1.5 print:hidden">
	<nav
		class="relative mx-auto flex max-w-7xl items-center justify-between gap-x-4 px-4 sm:px-6"
		aria-label="Global"
	>
		<NavbarIcon />

		<div class="flex flex-auto space-x-4 justify-self-start lg:ml-10">
			<DashboardButton />
			<!-- Large screen: nav links -->
			{#each navigation as item (item.label)}
				<a
					sveltekit:prefetch
					href={item.href}
					class="hidden rounded-md py-3 px-4 text-base font-medium text-white hover:bg-gray-700 hover:text-white lg:flex"
				>
					{item.label}
				</a>
			{/each}
		</div>

		<!-- {#if $session.user?.role?.roleType === 'ORGADMIN'}
			<SearchButton />
		{/if} -->

		{#if $session.isAuthenticated}
			<div class="hidden lg:flex lg:items-center lg:space-x-6">
				<NavbarDropdown />
			</div>
		{:else}
			<LoginButton />
		{/if}

		<div
			class="-mr-2 flex items-center gap-6 lg:hidden"
			class:hidden={!$session.isAuthenticated}
		>
			<NavPopover {navigation} />
		</div>
	</nav>
</div>
