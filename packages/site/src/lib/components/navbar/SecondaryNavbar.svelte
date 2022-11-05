<script lang="ts">
	import { page } from '$app/stores';
	import Alert from '$lib/components/navbar/Alert.svelte';
	import LoginButton from '$lib/components/navbar/LoginButton.svelte';
	import { openSidebar } from '$lib/components/sidebar/Sidebar.svelte';
	import { environment } from '$lib/environment';
	import { tick } from 'svelte';
	import HeroiconsBars3 from '~icons/heroicons/bars-3';
</script>

<header
	class="sticky top-0 z-50 flex w-full flex-col bg-white shadow-md print:hidden"
	aria-label="Global"
>
	{#if environment.PUBLIC_AQARATECH_ENV !== 'production'}
		<Alert />
	{/if}
	<div class="flex items-center gap-6 py-8 px-4">
		<button
			on:click={async () => {
				await tick(); // might not be necessary
				openSidebar();
			}}
		>
			<HeroiconsBars3 class="h-8 w-8 lg:hidden" />
		</button>
		<h2 class="text-3xl font-semibold text-gray-800 dark:text-white">
			Aqaratech
		</h2>
	</div>

	{#if !$page.data.user}
		<LoginButton />
	{/if}
</header>
