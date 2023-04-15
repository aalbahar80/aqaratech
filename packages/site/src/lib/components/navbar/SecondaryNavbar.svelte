<script lang="ts">
	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import { landingLinks } from '$lib/components/navbar/landing-links';
	import LoginButton from '$lib/components/navbar/LoginButton.svelte';
	import NavPopover, {
		popover,
	} from '$lib/components/navbar/NavPopover.svelte';
	import { sidebar } from '$lib/components/sidebar/Sidebar.svelte';
	import { SIDEBAR_TOGGLE } from '$lib/constants/misc';
	import LocaleSwitcher from '$lib/i18n/LocaleSwitcher.svelte';
	import AqaratechLogo1 from '$lib/svgs/AqaratechLogo1.svelte';
	import { isHomeRoute, isSidebarAvailable } from '$lib/utils/route-utils';
	import HeroiconsBars3 from '~icons/heroicons/bars-3';

	let visible = true;
	let last_scroll = 0;
	function handle_scroll() {
		const scroll = window.pageYOffset;
		visible = scroll < 50 || scroll < last_scroll;

		last_scroll = scroll;
	}
</script>

<svelte:window on:scroll={handle_scroll} />

<!-- Vertical Navbar Flexbox -->
<!-- Never hide navbar if popover is open to avoid overlay dimming issue -->
<header
	class="fixed z-50 flex w-full flex-col justify-center bg-white shadow-md duration-300 ease-in-out print:hidden"
	class:visible={visible || $popover.expanded || !isHomeRoute($page.route)}
	style:height="var(--nav-h)"
	aria-label="Global"
>
	<!-- Main horizontal navbar area -->
	<!-- NOTE: Any height offset should be kept in sync with Sidebar height -->
	<div class="flex items-center justify-between px-4 py-4 md:py-8">
		<!-- Logo and Hamburger Icon -->
		<div class="flex items-center gap-6">
			{#if isSidebarAvailable($page.route)}
				<button
					class="lg:hidden"
					use:sidebar.button
				>
					<span class="sr-only">Toggle sidebar</span>
					<HeroiconsBars3
						class="h-8 w-8"
						id={SIDEBAR_TOGGLE}
					/>
				</button>
			{/if}
			<a
				href={$page.data.user?.role?.meta.home ?? '/'}
				class="w-36 sm:w-44"
			>
				<AqaratechLogo1 />
			</a>
		</div>
		{#if isHomeRoute($page.route)}
			<div class="hidden gap-x-6 md:flex lg:gap-x-12">
				{#each landingLinks($L) as { label, href } (href)}
					<a
						{href}
						class="inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
						>{label}</a
					>
				{/each}
			</div>
		{/if}
		<div class="flex gap-4">
			<div
				class="flex flex-col justify-center gap-x-12 gap-y-4 text-gray-500 md:flex-row"
			>
				<LocaleSwitcher />
				{#if isHomeRoute($page.route)}
					<LoginButton />
				{/if}
			</div>

			{#if isHomeRoute($page.route)}
				<NavPopover />
			{/if}
		</div>
	</div>
</header>

<style>
	header:not(.visible) {
		transform: translate(0, calc(-100% - 1rem));
	}
</style>
