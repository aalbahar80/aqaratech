<script lang="ts" context="module">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, graphqlName, validation } from '$lib/definitions/Units';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const unit = await stuff.query(UnitEditPageDocument, {
			id,
		});

		// eslint-disable-next-line consistent-return
		return {
			props: {
				unit,
			},
		};
	};
</script>

<script lang="ts">
	export let unit: UnitEditPageStore;
	const existing: UnitEditPage['units_by_pk'] = $unit.data?.units_by_pk;
</script>

{#if existing}
	<FormCS
		{fieldList}
		updateDoc={UpdateUnitDocument}
		entity={graphqlName}
		{existing}
		{validation}
	/>
{:else}
	TODO: Error state
{/if}
