<script lang="ts">
	import { session } from '$app/stores';

	$: showDashboard =
		$session.user?.role.roleType === 'PORTFOLIO' ||
		$session.user?.role.roleType === 'TENANT';
</script>

{#if showDashboard}
	<a
		href={$session.user?.role.meta.home}
		class="inline-flex items-center rounded border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
		sveltekit:prefetch
	>
		Dashboard
	</a>
{/if}
