<script lang="ts">
	import { page } from '$app/stores';

	import L from '$i18n/i18n-svelte';
	import LoginButton from '$lib/components/navbar/LoginButton.svelte';
	import { sidebar } from '$lib/components/sidebar/Sidebar.svelte';
	import { SIDEBAR_TOGGLE } from '$lib/constants/misc';
	import LocaleSwitcher from '$lib/i18n/LocaleSwitcher.svelte';
	import { isHomeRoute, isSidebarAvailable } from '$lib/utils/route-utils';
	import HeroiconsBars3 from '~icons/heroicons/bars-3';
</script>

<!-- Vertical Navbar Flexbox -->
<header
	class="sticky top-0 z-50 flex w-full flex-col bg-white shadow-md print:hidden"
	aria-label="Global"
>
	<!-- Main horizontal navbar area -->
	<!-- NOTE: Any height offset should be kept in sync with Sidebar height -->
	<div class="flex items-center justify-between py-4 px-4 sm:py-8">
		<!-- Logo and Hamburger Icon -->
		<div class="flex items-center gap-6">
			{#if isSidebarAvailable($page.route)}
				<button class="lg:hidden" use:sidebar.button>
					<span class="sr-only">Toggle sidebar</span>
					<HeroiconsBars3 class="h-8 w-8" id={SIDEBAR_TOGGLE} />
				</button>
			{/if}
			<a
				href={$page.data.user?.role?.meta.home ?? '/'}
				class="text-3xl font-semibold text-gray-800 dark:text-white"
			>
				<h1>{$L.aqaratech.shortName()}</h1>
			</a>
		</div>
		<div class="flex flex-col gap-y-4 gap-x-12 text-gray-500 sm:flex-row">
			<LocaleSwitcher />
			{#if isHomeRoute($page.route)}
				<LoginButton />
			{/if}
		</div>
	</div>
</header>
