<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { CreditCard, ReceiptTax } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Load } from './index';

	export const load: Load = async ({ params }) => {
		const { id } = params;
		const trx = await trpc.query('transactions:read', id);
		return { props: { trx } };
	};
</script>

<script lang="ts">
	type Transaction = NonNullable<InferQueryOutput<'transactions:read'>>;
	export let trx: Transaction;
	export let mfUrl: string;
	let loading = false;

	const handlePayment = async () => {
		loading = true;
		try {
			const res = await fetch(`/api/payments/getUrl?id=${trx.id}`);
			const data = await res.json();
			mfUrl = data.mfUrl;
			goto(mfUrl).catch(console.error);
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	};

	const details: [string, string | null][] = [
		['Amount', kwdFormat(trx.amount)],
		['Memo', trx.memo],
		['Due on', dateFormat(trx.dueDate)],
	];
</script>

<div class="mx-auto flex max-w-2xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="flex items-center md:justify-between">
		<div class="min-w-0 flex-1">
			<h2
				class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
			>
				Transaction
			</h2>
		</div>
		<span
			class="inline-flex h-8 items-center rounded-md px-2.5 py-0.5 text-lg font-medium"
			class:paid={trx.isPaid}
			class:not-paid={!trx.isPaid}
		>
			{trx.isPaid ? 'Paid' : 'Not paid'}
		</span>
	</div>
	<DetailsPane {details} />
	<div class="mt-4 flex self-end md:mt-0">
		{#if trx.isPaid}
			<button
				type="button"
				class="inline-flex h-12 w-32 items-center justify-center rounded-md border border-transparent border-gray-300 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<Icon src={ReceiptTax} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
				Invoice
			</button>
		{:else}
			<Button
				class="h-12 w-32"
				on:click={handlePayment}
				{loading}
				disabled={loading}
				icon={CreditCard}
				text="Pay"
			/>
		{/if}
	</div>
	<pre>{JSON.stringify(trx, null, 2)}</pre>
</div>

<style lang="postcss">
	.paid {
		@apply bg-green-100 text-green-800;
	}
	.not-paid {
		@apply bg-pink-100 text-pink-800;
	}
</style>
