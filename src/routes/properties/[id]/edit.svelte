<script lang="ts" context="module">
	import FormCS from '$components/form/FormCS.svelte';
	import {
		fieldList,
		graphqlName,
		validation,
	} from '$lib/definitions/Properties';
	import type { Load } from '@sveltejs/kit';
	import {
		PropertyEditPage,
		PropertyEditPageDocument,
		PropertyEditPageStore,
		UpdatePropertyDocument,
	} from './_edit.gql';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const property = await stuff.query(PropertyEditPageDocument, {
			id,
		});

		// eslint-disable-next-line consistent-return
		return {
			props: {
				property,
			},
		};
	};
</script>

<script lang="ts">
	export let property: PropertyEditPageStore;
	const existing: PropertyEditPage['properties_by_pk'] =
		$property.data?.properties_by_pk;
</script>

{#if existing}
	<FormCS
		{fieldList}
		updateDoc={UpdatePropertyDocument}
		entity={graphqlName}
		{existing}
		{validation}
	/>
{:else}
	TODO: Error state
{/if}
