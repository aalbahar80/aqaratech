<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import Fa from 'svelte-fa/src/fa.svelte';
	import {
		faSearch,
		faSignOutAlt,
		faBars,
		faAdjust
	} from '@fortawesome/free-solid-svg-icons';
	import { fade } from 'svelte/transition';

	let showDrawer = false;

	function toggleDrawer() {
		showDrawer = !showDrawer;
	}
	const navLinkList = [
		{ name: 'Home', href: '/' },
		{ name: 'Clients', href: '/clients' },
		{ name: 'Properties', href: '/properties' },
		{ name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		{ name: 'Tenants', href: '/tenants' }
	];

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<nav
	class="grid grid-flow-row grid-cols-2 py-2 shadow-lg lg:grid-cols-3 justify-items-center justify-self-stretch bg-neutral text-neutral-content"
>
	<div class="self-center px-4 justify-self-start">
		<a href="/" class="text-lg font-bold ">Aqaratech</a>
	</div>
	<div class="hidden lg:flex">
		{#each navLinkList as { href, name }}
			<a {href} class="btn btn-ghost" class:btn-active={$page.path === href}>
				{name}
			</a>
		{/each}
	</div>
	<div class="px-4 justify-self-end">
		<button
			class="btn btn-ghost btn-square"
			data-toggle-theme="emerald,dracula"
		>
			<Fa icon={faAdjust} />
		</button>
		<button class="btn btn-ghost">
			<Fa icon={faSignOutAlt} />
		</button>
		<button class="btn btn-ghost lg:hidden" on:click={toggleDrawer}>
			<Fa icon={faBars} />
		</button>
	</div>

	{#if showDrawer}
		<div
			transition:fade={{ duration: 200 }}
			on:click={toggleDrawer}
			class="fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-20"
		/>
	{/if}
	<div
		class="fixed top-0 left-0 z-40 w-4/5 h-screen transition-transform bg-base-100"
		class:-translate-x-full={!showDrawer}
	>
		<ul class="py-3 overflow-y-auto text-3xl menu text-base-content">
			<li class="menu-title">
				<span> Aqaratech </span>
			</li>
			{#each navLinkList as { href, name }}
				<li class:bordered={$page.path === href}>
					<a {href}>
						{name}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>
