<script context="module" lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import type { Load } from '@sveltejs/kit';
	import format from 'date-fns/format';
	export const load: Load = async ({ params }) => {
		const { id } = params;

		// check if transaction exists
		const trx = await trpc.query('transactions:read', id);

		if (!trx) {
			return {
				status: 404,
				body: 'Transaction not found',
			};
		}
		return {
			status: 200,
			props: {
				trx,
			},
		};
	};
</script>

<script lang="ts">
	import { CreditCard, ReceiptTax } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	type Transaction = NonNullable<InferQueryOutput<'transactions:read'>>;
	export let trx: Transaction;

	const details: [string, string | boolean | null][] = [
		[
			'Amount',
			trx.amount.toLocaleString('en-KW', {
				style: 'currency',
				currency: 'KWD',
				maximumFractionDigits: 0,
			}),
		],
		['Memo', trx.memo],
		['Due on', format(trx.dueDate, 'MMM dd, yy')],
	];
</script>

<div class="mx-auto flex max-w-2xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="md:flex md:items-center md:justify-between">
		<div class="min-w-0 flex-1">
			<h2
				class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
			>
				Transaction
			</h2>
		</div>
		<span
			class="not-paid inline-flex h-8 items-center rounded-md px-2.5 py-0.5 text-sm font-medium"
			class:paid={trx.isPaid}
			class:not-paid={!trx.isPaid}
		>
			{trx.isPaid ? 'Paid' : 'Not paid'}
		</span>
		<div class="mt-4 flex md:mt-0 md:ml-4">
			{#if trx.isPaid}
				<button
					type="button"
					class="ml-3 inline-flex h-12 w-32 items-center justify-center rounded-md border border-transparent border-gray-300 bg-white  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
				>
					<Icon
						src={ReceiptTax}
						class="-ml-1 mr-2 h-5 w-5"
						aria-hidden="true"
					/>
					Invoice
				</button>
			{:else}
				<button
					type="button"
					class="ml-3 inline-flex h-12 w-32 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<Icon
						src={CreditCard}
						theme="solid"
						class="-ml-1 mr-2 h-5 w-5"
						aria-hidden="true"
					/>
					Pay
				</button>
			{/if}
		</div>
	</div>
	<DetailsPane {details} />
</div>

<pre>{JSON.stringify(trx, null, 2)}</pre>

<style lang="postcss">
	/* your styles go here */
	.paid {
		@apply bg-green-100 text-green-800;
	}
	.not-paid {
		@apply bg-pink-100 text-pink-800;
	}
</style>
