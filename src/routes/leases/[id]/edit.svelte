<script lang="ts" context="module">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, graphqlName, schema } from '$lib/definitions/Leases';
	import type { Load } from '@sveltejs/kit';
	import {
		LeaseEditPageDocument,
		UpdateLeaseDocument,
		type LeaseEditPage,
		type LeaseEditPageStore,
	} from './_edit.gql';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const lease = await stuff.query(LeaseEditPageDocument, {
			id,
		});

		// eslint-disable-next-line consistent-return
		return {
			props: {
				lease,
			},
		};
	};
</script>

<script lang="ts">
	export let lease: LeaseEditPageStore;
	const existing: LeaseEditPage['leases_by_pk'] = $lease.data?.leases_by_pk;
</script>

{#if existing}
	<FormCS
		{fieldList}
		updateDoc={UpdateLeaseDocument}
		entity={graphqlName}
		{existing}
		validation={schema}
	/>
{:else}
	TODO: Error state
{/if}
