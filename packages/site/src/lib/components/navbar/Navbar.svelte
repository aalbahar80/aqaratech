<script lang="ts">
	import { session } from '$app/stores';
	import NavPopover from '$components/navbar/NavPopover.svelte';
	import DashboardButton from '$lib/components/navbar/DashboardButton.svelte';
	import NavbarDropdown from '$lib/components/navbar/NavbarDropdown.svelte';
	import SearchButton from '$lib/components/search/SearchButton.svelte';
	import { LOGIN } from '$lib/constants/routes';

	// Needs to be reactive?
	const navigation = $session.user?.role.meta.navLinks || [];
</script>

<div class="bg-gray-900 py-1.5 print:hidden">
	<nav
		class="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
		aria-label="Global"
	>
		<a href="/">
			<span class="sr-only">Workflow</span>
			<img
				class="h-8 w-auto sm:h-10"
				src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg"
				alt=""
			/>
		</a>
		{#if $session.user}
			<div class="order-last -mr-2 flex items-center gap-6 lg:hidden">
				<DashboardButton />
				<NavPopover {navigation} />
			</div>
		{:else}
			<a
				href={LOGIN}
				sveltekit:reload
				class="inline-flex items-center rounded border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700 lg:hidden"
			>
				Log in
			</a>
		{/if}

		<!-- Large screen: nav links -->
		<div class="hidden space-x-4 lg:ml-10 lg:flex">
			{#each navigation as item (item.name)}
				<a
					sveltekit:prefetch
					href={item.href}
					class="rounded-md py-3 px-4 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
				>
					{item.name}
				</a>
			{/each}
		</div>
		<SearchButton />

		<!-- Large screen: nav actions -->
		<div class="hidden lg:flex lg:items-center lg:space-x-6">
			{#if $session.user}
				<DashboardButton />
				<NavbarDropdown />
			{:else}
				<a
					href={LOGIN}
					sveltekit:reload
					class="inline-flex items-center rounded border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
				>
					Log in
				</a>
			{/if}
		</div>
	</nav>
</div>
