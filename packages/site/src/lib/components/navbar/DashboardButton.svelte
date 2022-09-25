<script lang="ts">
	import { page } from '$app/stores';

	$: showDashboard =
		$page.data.user?.role?.roleType === 'PORTFOLIO' ||
		$page.data.user?.role?.roleType === 'TENANT';
</script>

{#if showDashboard}
	<a
		href={$page.data.user?.role?.meta.home}
		class="inline-flex items-center rounded border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
		data-sveltekit-prefetch
	>
		Dashboard
	</a>
{/if}
