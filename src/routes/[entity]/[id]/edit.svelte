<script context="module" lang="ts">
	import FormGeneric from '$components/form/FormGeneric.svelte';
	import trpc from '$lib/client/trpc';
	import { isEntity } from '$lib/definitions/index';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		const { entity, id } = params;
		if (!isEntity(entity)) {
			return {
				status: 404,
				error: 'Unknown entity',
			};
		}
		const data = await trpc.query(`${entity}:read`, id);
		if (data)
			return {
				props: { data },
			};
		return { error: 'id not found', status: 404 };
	};
</script>

<script lang="ts">
	export let data;
</script>

<FormGeneric formData={data} />
