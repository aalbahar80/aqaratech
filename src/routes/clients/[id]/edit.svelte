<script lang="ts" context="module">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, graphqlName, validation } from '$lib/definitions/Clients';
	import type { Load } from '@sveltejs/kit';
	import {
		ClientEditPage,
		ClientEditPageDocument,
		ClientEditPageStore,
		UpdateClientDocument,
	} from './_edit.gql';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const client = await stuff.query(ClientEditPageDocument, {
			id,
		});

		// eslint-disable-next-line consistent-return
		return {
			props: {
				client,
			},
		};
	};
</script>

<script lang="ts">
	export let client: ClientEditPageStore;
	const existing: ClientEditPage['clients_by_pk'] = $client.data?.clients_by_pk;
</script>

{#if existing}
	<FormCS
		{fieldList}
		updateDoc={UpdateClientDocument}
		entity={graphqlName}
		{existing}
		{validation}
	/>
{:else}
	TODO: Error state
{/if}
