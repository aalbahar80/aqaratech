<script lang="ts">
	import { page } from '$app/stores';
	import LoginButton from '$lib/components/navbar/LoginButton.svelte';
	import { openSidebar } from '$lib/components/sidebar/Sidebar.svelte';
	import { tick } from 'svelte';
	import HeroiconsBars3 from '~icons/heroicons/bars-3';
</script>

<header
	class="sticky top-0 z-50 flex w-full items-center gap-4 bg-white p-4 shadow-md print:hidden sm:p-6"
	aria-label="Global"
>
	<div class="flex items-center gap-4">
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
