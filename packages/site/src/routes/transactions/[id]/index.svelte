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
	import { CurrencyDollar } from '@steeze-ui/heroicons';
	import type { Load } from './index';

	export const load: Load = async ({ params, fetch }) => {
		const [trx, fetchReminder] = await Promise.all([
			trpc.query('transactions:read', params.id),
			// needs optimization, load in onMount?
			fetch(`/transactions/${params.id}/next-reminder`),
		]);
		let nextReminder: string | null = null;

		if (!fetchReminder.ok) {
			nextReminder = null;
		} else {
			nextReminder = (await fetchReminder.json()).reminder;
		}

		return { props: { trx, nextReminder } };
	};
</script>

<script lang="ts">
	import Timeline from '$lib/components/Timeline.svelte';

	type Transaction = InferQueryOutput<'transactions:read'>;
	export let trx: Transaction;
	export let nextReminder: string | null;

	let details: [string, string | null][];
	$: details = [
		['Amount', kwdFormat(trx.amount)],
		['Posted', dateFormat(trx.postAt)],
		['Due', trx.dueAt ? dateFormat(trx.dueAt) : '-'],
		['Created', dateFormat(trx.createdAt)],
		['Last updated', trx.updatedAt.toLocaleString()],
	];

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
	<div class="grid gap-y-6">
		<DetailsPane {details} />
		<Timeline {trx} {nextReminder} />
	</div>
</div>
