<script lang="ts">
	import { navigating, page } from '$app/stores';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import { PUBLIC_AQARATECH_ENV } from '$env/static/public';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import LogRocket from 'logrocket';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import '../styles/tailwind.css';
	import '../styles/theme.postcss';
	// skeleton theme/styles

	onMount(() => {
		// communicate that the app is ready - used for testing
		document.body.classList.add('started');

		if (PUBLIC_AQARATECH_ENV === 'production') {
			LogRocket.init('n4p0hb/aqaratech');
			if ($page.data.user) {
				LogRocket.identify($page.data.user.id || '', {
					email: $page.data.user.email,
					roleId: $page.data.user.role?.id || '',
					name: $page.data.user.fullName || '',
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
