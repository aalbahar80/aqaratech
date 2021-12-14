<script lang="ts">
	import { page } from '$app/stores';

	const navLinkList = [
		{ name: 'Home', href: '/' },
		{ name: 'Clients', href: '/clients' },
		{ name: 'Properties', href: '/properties' },
		{ name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		{ name: 'Tenants', href: '/tenants' }
	];

	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div
	class="mb-2 shadow-lg navbar bg-neutral text-neutral-content place-content-center min-w-screen"
>
	<div class="max-w-screen-2xl flex flex-nowrap flex-auto">
		<div class="px-2 mx-2 navbar-start">
			<span class="text-lg font-bold"> Aqaratech </span>
		</div>
		<div class="items-stretch hidden px-2 mx-2 navbar-center lg:flex">
			<!-- svelte-ignore a11y-missing-attribute -->
			<div class="flex items-stretch btn-group">
				{#each navLinkList as { href, name }}
					<a
						{href}
						class="btn btn-ghost"
						class:btn-active={$page.path === href}
					>
						{name}
					</a>
				{/each}
			</div>
		</div>
		<div class="flex navbar-end">
			<button
				data-toggle-theme="emerald,dracula"
				class="btn btn-square btn-ghost"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				</svg>
			</button>
			<button class="btn btn-square btn-ghost">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-6 h-6 stroke-current"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</div>
	</div>
</div>
