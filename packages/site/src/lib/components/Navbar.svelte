<script lang="ts">
	import { dev } from '$app/env';
	import { session } from '$app/stores';
	import NavPopover from '$components/navbar/NavPopover.svelte';
	import MSearch from '$lib/components/MSearch.svelte';
	import { getDocs } from '$lib/components/navbar/docs-url';
	import type { UserConfig } from '$lib/models/interfaces/user.interface';
	import { Search } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let navigation: UserConfig['navLinks'] = [];

	$: showDashboard =
		$session.user?.role.isOwner || $session.user?.role.isTenant;

	const docs = getDocs();
	let open = false;
</script>

<div class="bg-gray-900 py-6 print:hidden">
	<nav
		class="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
		aria-label="Global"
	>
		<div class="flex flex-1 items-center">
			<div class="flex w-full items-center justify-between lg:w-auto">
				<a href="/">
					<span class="sr-only">Workflow</span>
					<img
						class="h-8 w-auto sm:h-10"
						src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg"
						alt=""
					/>
				</a>

				<MSearch bind:open />
				<div class="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
					<div class="w-full max-w-lg lg:max-w-xs">
						<button class="relative">
							<div
								class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
							>
								<Icon
									src={Search}
									class="h-5 w-5 text-gray-400"
									aria-hidden="true"
									theme="solid"
								/>
							</div>
							<input
								id="search"
								name="search"
								class="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
								placeholder="Search"
								type="search"
								on:click={() => {
									open = true;
								}}
							/>
						</button>
					</div>
				</div>
				{#if $session.user}
					<div class="-mr-2 flex items-center gap-6 lg:hidden">
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
						href="/api/auth/login"
						sveltekit:reload
						class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700 lg:hidden"
					>
						Log in
					</a>
				{/if}
			</div>

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
		</div>
		<!-- Large screen: nav actions -->
		<div class="hidden lg:flex lg:items-center lg:space-x-6">
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
				{#if dev}
					<a
						href="/account/profile"
						class="text-base font-medium text-white hover:text-gray-300"
					>
						Profile
					</a>
				{/if}

				{#if $session.user.role.isAdmin}
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
				{/if}

				<a
					href="/account/logout"
					sveltekit:reload
					class="text-base font-medium text-white hover:text-gray-300"
				>
					Log out
				</a>
			{:else}
				<a
					href="/api/auth/login"
					sveltekit:reload
					class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
				>
					Log in
				</a>
			{/if}
		</div>
	</nav>
</div>
