<script lang="ts" context="module">
	import trpc from '$lib/client/trpc';
	import type { Load } from './__layout';
	// import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		console.log('running lease layout load', new Date().getSeconds());
		const lease = await trpc.query('leases:read', params.id);
		return { stuff: { lease } };
	};
</script>

<slot />
