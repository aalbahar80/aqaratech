<script context="module" lang="ts">
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import FormUnit from '$lib/components/form/FormUnit.svelte';
	import type { Load } from './edit';

	export const load: Load = async ({ params, fetch }) => {
		const unit = await trpc(fetch).query('units:read', params.id);
		return {
			props: { unit },
		};
	};
</script>

<script lang="ts">
	export let unit: InferQueryOutput<'units:read'>;
</script>

<FormUnit data={unit} />
