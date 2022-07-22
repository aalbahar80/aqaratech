<script lang="ts">
	import { LOGIN } from '$lib/constants/routes';
	import { session } from '$app/stores';
</script>

{#if !$session.user}
	<a
		href={LOGIN}
		sveltekit:reload
		class="inline-flex items-center rounded border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
	>
		Log in
	</a>
{/if}
