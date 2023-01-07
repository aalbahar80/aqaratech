<script lang="ts">
	import * as Sentry from '@sentry/svelte?client';
	import { BrowserTracing } from '@sentry/tracing?client';
	import { Toaster } from 'svelte-french-toast';

	import { navigating, page } from '$app/stores';
	import type { LayoutData } from './$types';
	import { onMount } from 'svelte';

	// eslint-disable-next-line import/no-named-as-default
	import LL, { setLocale, locale } from '$i18n/i18n-svelte';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import SecondaryNavbar from '$lib/components/navbar/SecondaryNavbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { isSidebarAvailable } from '$lib/components/sidebar/is-sidebar-available';
	import { getNavigationTree } from '$lib/components/sidebar/navigation-tree';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Modal from '$lib/components/toast/Modal.svelte';
	import VersionFooter from '$lib/components/VersionFooter.svelte';
	import { environment } from '$lib/environment';
	import { sentryConfig } from '$lib/environment/sentry.config';
	import HeadHrefLangs from '$lib/i18n/HeadHrefLangs.svelte';
	import { isHomeRoute } from '$lib/utils/is-home-route';
	import { getSentryUser } from '$lib/utils/sentry/common';

	import '../app.css';

	export let data: LayoutData;

	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);

	onMount(() => {
		// communicate that the app is ready - used for testing
		document.body.classList.add('started');

		// https://github.com/bluwy/vite-plugin-iso-import#what-happens-if-i-use-an-import-value-that-has-been-stripped-off
		if (!import.meta.env.SSR) {
			Sentry.init({
				...sentryConfig,
				// TODO: use environment variable to set the DSN
				dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
				integrations: [new BrowserTracing()],
			});

			Sentry.configureScope((scope) => {
				scope.setTag('roleType', data.user?.role?.roleType ?? '');
				scope.setUser(getSentryUser(data.user));
			});
		}
	});
</script>

<svelte:head>
	<title>Aqaratech</title>
	<meta name="description" content="Aqaratech Property Management" />
	<HeadHrefLangs />
</svelte:head>

{#if $navigating && !$page.error}
	<PreloadingIndicator />
{/if}
<Toaster />
<Modal />

<SecondaryNavbar />
{#if isHomeRoute($page.url.pathname)}
	<main>
		<slot />
	</main>
	<VersionFooter />
{:else}
	<div class="my-grid">
		{#if isSidebarAvailable($page.url.pathname) && data.user}
			<Sidebar navigationTree={getNavigationTree(data.user, $LL, $locale)} />
		{/if}

		<main class="col-span-full pt-8 lg:col-start-2">
			<div class="mx-auto flex flex-col space-y-6 px-4 sm:px-6 lg:px-8">
				{#if environment.PUBLIC_AQARATECH_ENV !== 'production'}
					<Alert />
				{/if}
				<slot />
				<VersionFooter />
			</div>
		</main>
	</div>
{/if}

<style>
	.my-grid {
		display: grid;
		grid-template-columns: minmax(0px, 16rem) repeat(1, minmax(0, 1fr));
	}
</style>
