<script lang="ts">
	import { page } from '$app/stores';

	import L, { locale } from '$i18n/i18n-svelte';
	import { landingLinks } from '$lib/components/navbar/landing-links';
	import LoginButton from '$lib/components/navbar/LoginButton.svelte';
	import { sidebar } from '$lib/components/sidebar/Sidebar.svelte';
	import { SIDEBAR_TOGGLE } from '$lib/constants/misc';
	import { withLocale } from '$lib/constants/routes';
	import LocaleSwitcher from '$lib/i18n/LocaleSwitcher.svelte';
	import AqaratechLogo1 from '$lib/svgs/AqaratechLogo1.svelte';
	import { isHomeRoute, isSidebarAvailable } from '$lib/utils/route-utils';
	import HeroiconsBars3 from '~icons/heroicons/bars-3';
</script>

<!-- Vertical Navbar Flexbox -->
<header
	class="fixed z-50 flex h-[--nav-h] w-full flex-col justify-center bg-white shadow-sm"
	aria-label="Global"
>
	<!-- Main horizontal navbar area -->
	<!-- NOTE: Any height offset should be kept in sync with Sidebar height -->
	<div class="flex items-center justify-between px-4 py-4 sm:py-8">
		<!-- Logo and Hamburger Icon -->
		<div class="flex items-center gap-6">
			<button
				class="sb:hidden print:hidden"
				use:sidebar.button
			>
				<span class="sr-only">Toggle sidebar</span>
				<HeroiconsBars3
					class="h-8 w-8"
					id={SIDEBAR_TOGGLE}
				/>
			</button>
			<a
				href={$page.data.user?.role?.meta.home ?? withLocale('/', $locale)}
				class="w-36 print:w-56 sm:w-44"
			>
				<AqaratechLogo1 />
			</a>
		</div>
		{#if isHomeRoute($page.route)}
			<div class="hidden gap-x-6 lg:flex lg:gap-x-12">
				{#each landingLinks($L) as { label, href } (href)}
					<a
						{href}
						class="inline-block rounded-lg px-2 py-1 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
						>{label}</a
					>
				{/each}
			</div>
		{/if}
		<div
			class="hidden flex-col gap-x-12 gap-y-4 text-gray-500 sm:flex-row"
			class:sb:flex={!isSidebarAvailable($page.route)}
		>
			<LocaleSwitcher />
			<LoginButton />
		</div>
	</div>
</header>
