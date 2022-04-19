<script lang="ts">
	import { dev } from '$app/env';
	import { page, session } from '$app/stores';
	import NavPopover from '$components/navbar/NavPopover.svelte';

	interface Navigation {
		name: string;
		href: string;
	}
	export let navigation: Navigation[] = [];

	const dashboards = {
		admin: '/clients',
		owner: `/portal/owner/${$session.authz?.id}`,
		tenant: `/portal/tenant/${$session.authz?.id}`,
	};

	const dashboard = $session.authz?.isOwner
		? dashboards.owner
		: $session.authz?.isTenant
		? dashboards.tenant
		: dashboards.admin;
</script>

<div class="bg-gray-900 py-6">
	<nav
		class="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
		aria-label="Global"
	>
		<div class="flex flex-1 items-center">
			<div class="flex w-full items-center justify-between md:w-auto">
				<a href="/">
					<span class="sr-only">Workflow</span>
					<img
						class="h-8 w-auto sm:h-10"
						src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg"
						alt=""
					/>
				</a>

				<!-- {#if $session.authz && homepage} -->
				{#if $page.url.pathname !== '/'}
					<div class="-mr-2 flex items-center md:hidden">
						<NavPopover {navigation} />
					</div>
				{:else if $session.authz}
					<!-- TODO change href -->
					<a
						href="/clients"
						class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700 md:hidden"
					>
						Dashboard
					</a>
				{:else}
					<a
						href="/api/auth/login"
						class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700 md:hidden"
					>
						Log in
					</a>
				{/if}
			</div>

			<!-- Large screen: nav links -->
			<div class="hidden space-x-8 md:ml-10 md:flex">
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
		<div class="hidden md:flex md:items-center md:space-x-6">
			{#if $session.authz}
				<!-- TODO change href -->
				<a
					href="/clients"
					class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
				>
					Dashboard
				</a>
				{#if dev}
					<a
						href="/account/profile"
						class="text-base font-medium text-white hover:text-gray-300"
					>
						Profile
					</a>
				{/if}
				<a
					href="/account/logout"
					class="text-base font-medium text-white hover:text-gray-300"
				>
					Log out
				</a>
			{:else}
				<a
					href="/api/auth/login"
					class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
				>
					Log in
				</a>
			{/if}
		</div>
	</nav>
</div>
