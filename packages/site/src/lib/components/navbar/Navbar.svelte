<script lang="ts">
	import { dev } from '$app/env';
	import { session } from '$app/stores';
	import NavPopover from '$components/navbar/NavPopover.svelte';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import MenuIconItem from '$lib/components/buttons/MenuIconItem.svelte';
	import { getDocs } from '$lib/components/navbar/docs-url';
	import SearchButton from '$lib/components/search/SearchButton.svelte';
	import { LOGIN, LOGOUT } from '$lib/constants/routes';
	import type { MenuOption } from '$lib/models/interfaces/option.interface';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import {
		ChevronDown,
		Code,
		InformationCircle,
		Logout,
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// Needs to be reactive?
	const navigation = $session.user?.role.meta.navLinks || [];

	$: showDashboard =
		$session.user?.role.roleType === 'PORTFOLIO' ||
		$session.user?.role.roleType === 'TENANT';

	const docs = getDocs();

	const getRoleOptions = (user: App.Session['user']): MenuOption[] =>
		user?.roles.map((role) => ({
			href: `/auth/roles/${role.id}`,
			label: `${role.organization.fullName} : ${role.meta.roleLabel}`,
		})) || [];

	const options = [
		...getRoleOptions($session.user),
		...(dev ? [{ label: 'Debug', href: '/debug', icon: Code }] : []),
		// { label: 'Settings', href: '#', icon: Cog },
		{ label: 'Docs', href: docs, icon: InformationCircle }, // TODO: open in new tab { target="_blank" } & sveltekit:reload
		{ label: 'Logout', href: LOGOUT, icon: Logout }, // sveltekit:reload?
	];
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
				{#if showDashboard}
					<a
						href={$session.user.role.meta.home}
						class="inline-flex items-center rounded border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700 lg:hidden"
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
				{#if showDashboard}
					<a
						href={$session.user.role.meta.home}
						class="inline-flex items-center rounded border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
						sveltekit:prefetch
					>
						Dashboard
					</a>
				{/if}

				<Dropdown>
					<div
						slot="button"
						class="group inline-flex items-center rounded border border-transparent px-4 py-2  text-sm font-medium text-white hover:bg-gray-700"
					>
						<div class="pr-3">
							<p>{$session.user.role.organization.fullName}</p>
							<span class="font-medium text-slate-300 group-hover:text-white">
								{$session.user.role.meta.roleLabel}
							</span>
						</div>
						<Icon
							src={ChevronDown}
							class="h-5 w-5 text-slate-300 group-hover:text-white"
							aria-hidden="true"
							theme="solid"
						/>
					</div>
					<div slot="menu">
						<DropdownMenu>
							{#each options as option}
								<MenuItem let:active>
									<a href={option.href} sveltekit:reload>
										<MenuIconItem {option} {active} />
									</a>
								</MenuItem>
							{/each}
						</DropdownMenu>
					</div>
				</Dropdown>
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
