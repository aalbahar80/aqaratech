<script lang="ts">
	import { dev } from '$app/env';
	import { session } from '$app/stores';
	import NavPopover from '$components/navbar/NavPopover.svelte';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import { getDocs } from '$lib/components/navbar/docs-url';
	import SearchButton from '$lib/components/search/SearchButton.svelte';
	import { LOGIN, LOGOUT } from '$lib/constants/routes';
	import type { MenuOption } from '$lib/models/interfaces/option.interface';
	import type { UserConfig } from '$lib/models/interfaces/user.interface';
	import { ChevronDown, Pencil, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let navigation: UserConfig['navLinks'] = [];

	$: showDashboard =
		$session.user?.role.isOwner || $session.user?.role.isTenant;

	const docs = getDocs();
	let open = false;

	const options: MenuOption[] = [
		{ label: 'Update', href: '#', icon: Pencil },
		{ label: 'Remove', href: '#', icon: Trash },
	];
</script>

<div class="bg-gray-900 py-6 print:hidden">
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
				{#if showDashboard}
					<a
						href={$session.user.role.home}
						class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700 lg:hidden"
					>
						Dashboard
					</a>
				{/if}
				<NavPopover {navigation} />
			</div>
		{:else}
			<a
				href={LOGIN}
				sveltekit:reload
				class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700 lg:hidden"
			>
				Log in
			</a>
		{/if}

		<!-- Large screen: nav links -->
		<div class="hidden space-x-8 lg:ml-10 lg:flex">
			{#each navigation as item (item.name)}
				<a
					sveltekit:prefetch
					href={item.href}
					class="text-base font-medium text-white hover:text-gray-300"
				>
					{item.name}
				</a>
			{/each}
		</div>
		<SearchButton />

		<!-- Large screen: nav actions -->
		<div class="hidden lg:flex lg:items-center lg:space-x-6">
			<Dropdown>
				<div
					slot="button"
					class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2  text-xs font-medium text-white hover:bg-gray-700"
				>
					<div>
						<p>Org Name</p>
						<span>sdfk</span>
					</div>
					<Icon
						src={ChevronDown}
						class="h-5 w-5"
						aria-hidden="true"
						theme="solid"
					/>
				</div>
				<div slot="menu">
					<DropdownMenu {options} />
				</div>
			</Dropdown>

			{#if $session.user}
				{#if showDashboard}
					<a
						href={$session.user.role.home}
						class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
						sveltekit:prefetch
					>
						Dashboard
					</a>
				{/if}
				<!-- {#if dev}
					<a
						href="/debug"
						class="text-base font-medium text-white hover:text-gray-300"
					>
						Debug
					</a>
				{/if} -->

				<!-- {#if $session.user.role.isAdmin}
					<a
						href={docs}
						sveltekit:reload
						target="_blank"
						class="text-base font-medium text-white hover:text-gray-300"
					>
						Docs
					</a>
					<a
						href="/settings/expense-categories"
						class="text-base font-medium text-white hover:text-gray-300"
					>
						Settings
					</a>
				{/if} -->

				<a
					href={LOGOUT}
					sveltekit:reload
					class="text-base font-medium text-white hover:text-gray-300"
				>
					Log out
				</a>
			{:else}
				<a
					href={LOGIN}
					sveltekit:reload
					class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
				>
					Log in
				</a>
			{/if}
		</div>
	</nav>
</div>
