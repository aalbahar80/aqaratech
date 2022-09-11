<script lang="ts">
	import { navigating, page } from '$app/stores';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import {
		PUBLIC_AQARATECH_ENV,
		PUBLIC_AQ_DEBUG_SITE,
	} from '$env/static/public';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import { getSentryUser } from '$lib/utils/sentry-utils';
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

		Sentry.init({
			// TODO: use environment variable to set the DSN
			dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
			integrations: [new BrowserTracing()],
			tracesSampleRate: PUBLIC_AQARATECH_ENV !== 'production' ? 0.5 : 1,
			debug: PUBLIC_AQ_DEBUG_SITE === '1',
			environment: PUBLIC_AQARATECH_ENV,
			release: data.version,
		});

		Sentry.configureScope((scope) => {
			scope.setTag('roleType', data.user?.role?.roleType || '');
			scope.setUser(getSentryUser(data.user));
		});

		if (PUBLIC_AQARATECH_ENV === 'production') {
			const LogRocket = await import('logrocket');
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
	{#if PUBLIC_AQARATECH_ENV !== 'production'}
		<Alert />
	{/if}
	<ToastParent />
	<Navbar />
	{#if $page.url.pathname === '/'}
		<slot />
	{:else}
		<div class="mx-auto flex max-w-7xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
			<slot />
		</div>
	{/if}
</div>
