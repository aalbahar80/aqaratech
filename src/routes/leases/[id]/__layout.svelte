<script lang="ts" context="module">
	import trpc from '$lib/client/trpc';
	import type { Load } from './__layout';
	// import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, fetch }) => {
		console.log('running lease layout load', new Date().getSeconds());
		const lease = await trpc(fetch).query('leases:read', params.id);
		return { stuff: { lease } };
	};
</script>

<slot />
