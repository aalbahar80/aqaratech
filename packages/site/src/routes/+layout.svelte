<script lang="ts">
	import { navigating, page } from '$app/stores';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import VersionFooter from '$lib/components/VersionFooter.svelte';
	import { environment } from '$lib/environment';
	import { getSentryUser } from '$lib/utils/sentry/common';
	import { getSentryConfig } from '@self/utils';
	import * as Sentry from '@sentry/svelte?client';
	import { BrowserTracing } from '@sentry/tracing?client';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import '../styles/tailwind.css';
	import '../styles/theme.postcss';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		// communicate that the app is ready - used for testing
		document.body.classList.add('started');

		// https://github.com/bluwy/vite-plugin-iso-import#what-happens-if-i-use-an-import-value-that-has-been-stripped-off
		if (!import.meta.env.SSR) {
			const sentryConfig = getSentryConfig({
				PUBLIC_AQ_DEBUG_SENTRY: environment.PUBLIC_AQ_DEBUG_SENTRY,
				PUBLIC_AQARATECH_ENV: environment.PUBLIC_AQARATECH_ENV,
				PUBLIC_TRACE_RATE: environment.PUBLIC_TRACE_RATE,
				commitSha: __COMMIT_SHA__,
				version: __AQARATECH_APP_VERSION__,
				repoName: 'site',
			});

			Sentry.init({
				...sentryConfig,
				// TODO: use environment variable to set the DSN
				dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
				integrations: [new BrowserTracing()],
				release: `site-${__AQARATECH_APP_VERSION__}`,
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
		<div class="mx-auto flex max-w-7xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
			<slot />
			<VersionFooter />
		</div>
	{/if}
</div>
