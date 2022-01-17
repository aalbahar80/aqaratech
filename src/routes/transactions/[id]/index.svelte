<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ActionPanel from '$components/ActionPanel.svelte';
	import BreadCrumbs from '$components/breadcrumbs/BreadCrumbs.svelte';
	import DeleteModal from '$components/toast/DeleteModal.svelte';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import { Button } from 'carbon-components-svelte';
	import {
		Bullhorn16,
		CertificateCheck16,
		NonCertified16,
		ShoppingCart16,
	} from 'carbon-icons-svelte';
	import {
		DeleteTransactionDocument,
		TransactionDetailPageDocument,
		TransactionDetailPageStore,
	} from './_index.gql';

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

	let crumbs: CrumbData;
	$: crumbs = {
		transaction: $transaction.data?.transactions_by_pk?.id,
		lease: $transaction.data?.transactions_by_pk?.lease_id,
	};

	const paid = $transaction.data?.transactions_by_pk?.is_paid ?? false;
</script>

<BreadCrumbs {crumbs} />
<ActionPanel {id} deleteDocumentNode={DeleteTransactionDocument}>
	<svelte:fragment slot="delete">
		<DeleteModal
			{id}
			deleteDocumentNode={DeleteTransactionDocument}
			buttonProps={{ disabled: paid }}
		/>
	</svelte:fragment>
	<svelte:fragment slot="row2">
		<Button
			kind="tertiary"
			iconDescription={paid ? 'Mark as unpaid' : 'Mark as paid'}
			icon={paid ? CertificateCheck16 : NonCertified16}
			disabled
		/>
		<Button
			kind="tertiary"
			iconDescription="Send Reminder"
			icon={Bullhorn16}
			disabled={paid}
		/>
		<Button
			kind="tertiary"
			iconDescription="Pay"
			icon={ShoppingCart16}
			href={`/api/pay?amount=${$transaction.data?.transactions_by_pk?.amount}`}
			rel="external"
		/>
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
