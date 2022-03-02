<script lang="ts" context="module">
	import trpc from '$lib/client/trpc';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };

		console.log('runnind lease layout load', new Date().getSeconds());
		const lease = await trpc.query('leases:read', params.id);
		if (lease) return { stuff: { lease } };

		return { error: 'Lease not found', status: 404 };
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<slot />
</div>
