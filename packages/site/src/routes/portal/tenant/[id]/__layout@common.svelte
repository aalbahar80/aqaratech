<script lang="ts" context="module">
	import trpc from '$lib/client/trpc';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		// @ts-ignore
		trpc.runtime.fetch = fetch;
		return {};
	};
</script>

<slot />
