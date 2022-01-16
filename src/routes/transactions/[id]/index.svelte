<script context="module" lang="ts">
	import ActionPanel from '$components/ActionPanel.svelte';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import {
		DeleteTransactionDocument,
		TransactionDetailPageDocument,
		TransactionDetailPageStore,
	} from './_index.gql';
	import { page } from '$app/stores';
	import { Button } from 'carbon-components-svelte';

	export const prerender = true;

	export const load: Load = async ({ params, stuff }) => {
		const { id } = params;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const transaction: TransactionDetailPageStore = await stuff.query(
			TransactionDetailPageDocument,
			{
				id,
			},
		);
		return {
			props: {
				transaction,
			},
		};
	};
</script>

<script lang="ts">
	export let transaction: TransactionDetailPageStore;
	$: id = $page.params.id;
	query(transaction);
	$: result = $transaction?.data?.transactions_by_pk;
</script>

<ActionPanel {id} deleteDocumentNode={DeleteTransactionDocument}>
	<svelte:fragment slot="row2">
		<Button kind="tertiary" iconDescription="Generate new PDF" />
	</svelte:fragment>
</ActionPanel>

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($transaction.data?.transactions_by_pk || {}) as [key, value]}
			<p>{key}</p>
			<p>{value}</p>
		{/each}
	</div>
</div>
