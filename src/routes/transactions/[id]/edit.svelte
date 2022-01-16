<script lang="ts" context="module">
	import FormCS from '$components/form/FormCS.svelte';
	import {
		fieldList,
		graphqlName,
		validation,
	} from '$lib/definitions/Transactions';
	import type { Load } from '@sveltejs/kit';
	import {
		TransactionEditPage,
		TransactionEditPageDocument,
		TransactionEditPageStore,
		UpdateTransactionDocument,
	} from './_edit.gql';

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;

		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const transaction = await stuff.query(TransactionEditPageDocument, {
			id,
		});

		// eslint-disable-next-line consistent-return
		return {
			props: {
				transaction,
			},
		};
	};
</script>

<script lang="ts">
	export let transaction: TransactionEditPageStore;
	const existing: TransactionEditPage['transactions_by_pk'] =
		$transaction.data?.transactions_by_pk;
</script>

{#if existing}
	<FormCS
		{fieldList}
		updateDoc={UpdateTransactionDocument}
		entity={graphqlName}
		{existing}
		{validation}
	/>
{:else}
	TODO: Error state
{/if}
