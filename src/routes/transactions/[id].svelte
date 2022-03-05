<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import Button from '$lib/components/Button.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { addToast } from '$lib/stores/toast';
	import { CurrencyDollar, Speakerphone, Trash } from '@steeze-ui/heroicons';
	import type { Load } from '@sveltejs/kit';
	import format from 'date-fns/format';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const trx = await trpc.query('transactions:read', params.id);
		return { props: { trx } };
	};
</script>

<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';

	type Transaction = InferQueryOutput<'transactions:read'>;
	export let trx: Transaction;

	let details: [string, string | null][];
	$: details = [
		['Due Date', format(trx.dueDate, 'MMM dd, yy')],
		[
			'Amount',
			trx.amount.toLocaleString('en-KW', {
				style: 'currency',
				currency: 'KWD',
				maximumFractionDigits: 0,
			}),
		],
		['Receipt', trx.receiptUrl],
		['Created on', format(trx.createdAt, 'MMM dd, yy')],
		['Last updated', trx.updatedAt.toLocaleString()],
	];

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};

	let loading = false;
	const toggleIsPaid = async () => {
		loading = true;
		try {
			const updated = await trpc.mutation('transactions:update', {
				id: trx.id,
				isPaid: !trx.isPaid,
			});
			trx = { ...trx, ...updated };
			addToast({
				props: {
					kind: 'success',
					title: 'Success',
				},
			});
		} catch (e) {
			console.error(e);
			addToast({
				props: {
					kind: 'error',
					title: 'Unable to update status',
				},
			});
		} finally {
			loading = false;
		}
	};
</script>

<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="lg:flex lg:items-center lg:justify-between">
		<ModalDelete bind:isOpen id={trx.id} entity="transactions" />
		<div class="min-w-0 flex-1">
			<BreadCrumb
				crumbs={[
					['tenants', trx.lease.tenantId],
					['leases', trx.leaseId],
				]}
			/>
			<div class="mt-2 flex items-center space-x-8">
				<h2
					class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
				>
					Transaction
				</h2>
				<span
					class="inline-flex h-8 items-center rounded-md px-2.5 py-0.5 text-lg font-medium"
					class:paid={trx.isPaid}
					class:not-paid={!trx.isPaid}
				>
					{trx.isPaid ? 'Paid' : 'Not paid'}
				</span>
			</div>
		</div>
		<div class="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
			<Button icon={Speakerphone} text="Send Reminder" solid disabled />
			<Button
				icon={CurrencyDollar}
				text={trx.isPaid ? 'Mark as Unpaid' : 'Mark as Paid'}
				solid
				on:click={toggleIsPaid}
				{loading}
			/>
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/transactions/${trx.id}/edit`,
					type: 'link',
				}}
				options={[
					{
						label: 'Delete',
						icon: Trash,
						onClick: openModal,
						type: 'button',
					},
				]}
			/>
		</div>
	</div>
	<DetailsPane {details} />
</div>

<style lang="postcss">
	.paid {
		@apply bg-green-100 text-green-800;
	}
	.not-paid {
		@apply bg-pink-100 text-pink-800;
	}
</style>
