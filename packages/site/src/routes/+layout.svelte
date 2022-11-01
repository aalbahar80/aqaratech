<script lang="ts">
	import { navigating, page } from '$app/stores';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { getNavigationTree } from '$lib/components/sidebar/navigation-tree';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import VersionFooter from '$lib/components/VersionFooter.svelte';
	import { environment } from '$lib/environment';
	import { sentryConfig } from '$lib/environment/sentry.config';
	import { getSentryUser } from '$lib/utils/sentry/common';
	import * as Sentry from '@sentry/svelte?client';
	import { BrowserTracing } from '@sentry/tracing?client';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import '../styles/tailwind.css';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
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
				scope.setTag('roleType', data.user?.role?.roleType || '');
				scope.setUser(getSentryUser(data.user));
			});

			if (
				environment.PUBLIC_AQARATECH_ENV === 'production' ||
				environment.PUBLIC_AQARATECH_ENV === 'staging'
			) {
				const LogRocket = (await import('logrocket')).default;
				LogRocket.init('n4p0hb/aqaratech');
				if ($page.data.user) {
					LogRocket.identify($page.data.user.id || '', {
						email: $page.data.user.email,
						roleId: $page.data.user.role?.id || '',
						name: $page.data.user.fullName || '',
					});
				}
				LogRocket.getSessionURL((sessionURL) => {
					Sentry.configureScope((scope) => {
						scope.setExtra('sessionURL', sessionURL);
					});
				});
			}
		}
	});
</script>

<MetaTags
	title="Aqaratech"
	description="Your property at a glance."
	canonical="https://www.aqaratech.com/"
/>

{#if $navigating && !$page.error}
	<PreloadingIndicator />
{/if}

<div>
	{#if environment.PUBLIC_AQARATECH_ENV !== 'production'}
		<Alert />
	{/if}
	<ToastParent />
	<Navbar />
	{#if $page.url.pathname === '/'}
		<slot />
		<VersionFooter />
	{:else}
		<div class="grid grid-cols-12">
			<div class="hidden lg:col-span-3 lg:block">
				<Sidebar navigationTree={getNavigationTree(data.user)} />
			</div>

			<div class="col-span-12 lg:col-span-9">
				<div
					class="mx-auto flex max-w-7xl flex-col space-y-6 p-4 sm:p-6 lg:p-8"
				>
					<slot />
					<VersionFooter />
				</div>
			</div>
		</div>
	{/if}
</div>
