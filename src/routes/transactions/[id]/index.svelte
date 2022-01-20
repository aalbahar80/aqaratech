<script context="module" lang="ts">
	import { page } from '$app/stores';
	import ActionPanel from '$components/ActionPanel.svelte';
	import BreadCrumbs from '$components/breadcrumbs/BreadCrumbs.svelte';
	import NextPrev from '$components/breadcrumbs/NextPrev.svelte';
	import DeleteModal from '$components/toast/DeleteModal.svelte';
	import { logger } from '$lib/config/logger';
	import { addToast } from '$lib/stores/toast';
	import type { Load } from '@sveltejs/kit';
	import { query } from '@urql/svelte';
	import { Button, CopyButton } from 'carbon-components-svelte';
	import {
		Bullhorn16,
		CertificateCheck16,
		CopyLink16,
		MailAll16,
		MailAll24,
		MailAll32,
		NonCertified16,
		ShoppingCart16,
	} from 'carbon-icons-svelte';
	import { flip } from 'svelte/animate';
	import { fade, slide } from 'svelte/transition';
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

	$: paid = $transaction.data?.transactions_by_pk?.is_paid ?? false;
	$: noun = paid ? 'receipt' : 'payment';
	$: trxId = $transaction.data?.transactions_by_pk?.id;
	$: url = `${$page.url.origin}/p/transactions/${transaction.data?.transactions_by_pk?.id}`;
	const phone = import.meta.env.VITE_MOBILE;
	const copy = () => navigator.clipboard.writeText(url);
	const sendSms = async () => {
		const res = await fetch(`/api/sms?id=${trxId}&phone=${phone}`);
		const data = await res.json();
		if (res.ok) {
			addToast({
				props: {
					title: `SMS request sent`,
					subtitle: `Phone: ${phone}`,
					type: 'success',
				},
			});
		} else {
			addToast({
				props: {
					title: `Unable to send SMS`,
					subtitle: `Phone: ${phone}`,
					type: 'error',
				},
			});
		}
	};
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
			iconDescription={`Copy ${noun} link`}
			icon={CopyLink16}
			on:click={copy}
		/>
		<Button
			kind="tertiary"
			iconDescription={`Send ${noun} link`}
			icon={MailAll32}
			on:click={sendSms}
		/>
	</svelte:fragment>
</ActionPanel>

<div class="max-w-4xl mx-auto px-6">
	<div class="grid grid-cols-2 gap-2 mt-8 max-w-md justify-self-center">
		{#each Object.entries($transaction.data?.transactions_by_pk || {}) as [key, value] (key)}
			<div transition:slide animate:flip>
				<p>{key}</p>
				<p>{value}</p>
			</div>
		{/each}
	</div>
</div>
