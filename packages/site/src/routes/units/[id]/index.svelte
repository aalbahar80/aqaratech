<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import type { Load } from './[id]';

	export const load: Load = async ({ params }) => {
		const unit = await trpc.query('units:read', params.id);
		return { props: { unit } };
	};
</script>

<script lang="ts">
	type Unit = InferQueryOutput<'units:read'>;
	export let unit: Unit;
</script>

<UnitPage {unit} />
