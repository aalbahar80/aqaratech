<script lang="ts">
	import { navigating, page } from '$app/stores';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import { env } from '$env/dynamic/public';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import PreloadingIndicator from '$lib/components/PreloadingIndicator.svelte';
	import LogRocket from 'logrocket';
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import '../styles/tailwind.css';

	onMount(() => {
		if (env.PUBLIC_AQARATECH_ENV === 'production') {
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
	{#if env.PUBLIC_AQARATECH_ENV !== 'production'}
		<Alert />
	{/if}
	<ToastParent />
	<Navbar />
	<slot />
</div>
