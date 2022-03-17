<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import trpc from '$lib/client/trpc';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { addToast } from '$lib/stores/toast';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { CurrencyDollar, Speakerphone } from '@steeze-ui/heroicons';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };
		const trx = await trpc.query('transactions:read', params.id);
		return { props: { trx } };
	};
</script>

<script lang="ts">
	type Transaction = InferQueryOutput<'transactions:read'>;
	export let trx: Transaction;

	let details: [string, string | null][];
	$: details = [
		['Due Date', dateFormat(trx.dueDate)],
		['Amount', kwdFormat(trx.amount)],
		['Receipt', trx.receiptUrl],
		['Next Reminder', trx.reminderAt?.toLocaleDateString() ?? ''],
		['Created on', dateFormat(trx.createdAt)],
		['Last updated', trx.updatedAt.toLocaleString()],
	];

	let loadingSend = false;
	let loadingPaid = false;
	const toggleIsPaid = async () => {
		loadingPaid = true;
		try {
			const updated = await trpc.mutation('transactions:updatePaid', {
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
			loadingPaid = false;
		}
	};

	const send = async () => {
		loadingSend = true;
		try {
			const res = await fetch('/api/sms', {
				method: 'POST',
				body: JSON.stringify({
					// phone: trx.lease.tenant.phone,
					phone: '+96599123456',
					// phone: '+15005550009', // invalid
					message: `Your transaction of ${kwdFormat(
						trx.amount,
					)} KWD has been received.`,
				}),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Unable to send SMS');

			console.log({ data }, '[id].svelte ~ 82');
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
					title: e instanceof Error ? e.message : 'Unable to send SMS',
				},
			});
		} finally {
			loadingSend = false;
		}
	};
</script>

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading title="Transaction" id={trx.id} entity="transactions">
		<svelte:fragment slot="breadcrumbs">
			<BreadCrumb
				crumbs={[
					['tenants', trx.lease.tenantId],
					['leases', trx.leaseId],
				]}
			/>
		</svelte:fragment>

		<svelte:fragment slot="actions">
			<Button
				icon={Speakerphone}
				text="Send Reminder"
				solid
				on:click={send}
				disabled={trx.isPaid}
				loading={loadingSend}
			/>
			<Button
				icon={CurrencyDollar}
				text={trx.isPaid ? 'Mark as Unpaid' : 'Mark as Paid'}
				solid
				on:click={toggleIsPaid}
				loading={loadingPaid}
			/>
		</svelte:fragment>
	</Heading>
	<Badge
		label={trx.isPaid ? 'Paid' : 'Not paid'}
		badgeColor={trx.isPaid ? 'green' : 'red'}
	/>
	<DetailsPane {details} />
</div>
