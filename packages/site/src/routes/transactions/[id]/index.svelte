<script lang="ts" context="module">
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { Mail } from '@steeze-ui/heroicons';
	import type { Load } from './index';

	export const load: Load = async ({ params, fetch }) => {
		const trx = await trpc(fetch).query('transactions:read', params.id);
		return { props: { trx } };
	};
</script>

<script lang="ts">
	type Transaction = InferQueryOutput<'transactions:read'>;
	export let trx: Transaction;

	let details: [string, string | null][];
	$: details = [
		['Amount', kwdFormat(trx.amount)],
		['Posted', dateFormat(trx.postAt)],
		['Due', trx.dueAt ? dateFormat(trx.dueAt) : '-'],
		['Created', dateFormat(trx.createdAt)],
		['Last updated', trx.updatedAt.toLocaleString()],
	];

	$: sendEnabled = !trx.isPaid;
</script>

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
		<AsyncButton
			func={() =>
				fetch('/transactions/' + trx.id + '/notify', {
					method: 'POST',
					body: JSON.stringify({ mode: 'email' }),
				})}
			disabled={!sendEnabled}
			let:loading
			let:disabled
		>
			<Button
				as="div"
				{disabled}
				{loading}
				icon={Mail}
				text={'Send email reminder'}
				solid
			/>
		</AsyncButton>
	</svelte:fragment>
</Heading>
<Badge
	label={trx.isPaid ? 'Paid' : 'Not paid'}
	badgeColor={trx.isPaid ? 'green' : 'red'}
/>
<div class="grid gap-y-6">
	<DetailsPane {details} />
</div>
