<script lang="ts">
	import * as Sentry from '@sentry/sveltekit';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import clsx from 'clsx';
	import { Toaster } from 'svelte-french-toast';

	import { navigating, page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';
	import { isLiveEnv } from '@self/utils';

	import '../app.css';

	import L, { setLocale, locale } from '$i18n/i18n-svelte';
	import { baseLocale } from '$i18n/i18n-util';
	import SecondaryNavbar from '$lib/components/navbar/SecondaryNavbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { getNavigationTree } from '$lib/components/sidebar/navigation-tree';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Modal from '$lib/components/toast/Modal.svelte';
	import { environment } from '$lib/environment';
	import { sentryConfig } from '$lib/environment/sentry.config';
	import HeadHrefLangs from '$lib/i18n/HeadHrefLangs.svelte';
	import { width } from '$lib/stores/width';
	import { isHomeRoute, isSidebarAvailable } from '$lib/utils/route-utils';
	import { getSentryUser } from '$lib/utils/sentry';

	export let data: LayoutData;

	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale ?? baseLocale);

	onMount(() => {
		if (sentryConfig.enabled) {
			Sentry.setUser(getSentryUser(data.user));
		}

		if (!isLiveEnv(environment.PUBLIC_AQARATECH_ENV)) {
			// communicate that the app is ready - used for testing
			document.body.setAttribute('data-testid', 'started');
		}
	});
</script>

<svelte:head>
	<title>Aqaratech</title>
	<meta
		name="description"
		content="Aqaratech Property Management"
	/>
	<HeadHrefLangs />
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	{#if $navigating && !$page.error}
		<PreloadingIndicator />
	{/if}
	<Toaster />
	<Modal />

	<SecondaryNavbar />
	<div
		class:bg-gray-50={isHomeRoute($page.route)}
		class={clsx(
			'pt-[--nav-h]',
			isSidebarAvailable($page.route) &&
				'sb:grid sb:grid-cols-my-grid sb:print:block', // be explicit with `sb:print:block` (insted of just `print:block`) to avoid webkit issue
		)}
	>
		<Sidebar
			navigationTree={getNavigationTree(
				data.user,
				$L,
				$locale,
				$page.route,
				$page.url,
				$page.params['portfolioId'],
			)}
		/>

		<main class="col-span-full py-8 lg:col-start-2">
			{#if isHomeRoute($page.route)}
				<slot />
			{:else}
				<div
					class={clsx(
						'mx-auto flex flex-col space-y-6 px-4 sm:px-6 lg:px-8',
						$width,
					)}
				>
					<slot />
				</div>
			{/if}
		</main>
	</div>
</QueryClientProvider>
