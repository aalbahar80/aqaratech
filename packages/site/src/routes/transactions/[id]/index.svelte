<script lang="ts" context="module">
	import { page } from '$app/stores';
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Property, Transaction, Unit } from '$lib/models/classes';
	import { toUTCFormat, kwdFormat } from '$lib/utils/common';
	import { copyTrxUrl } from '$lib/utils/copy-trx-url';
	import { ClipboardCopy, Mail } from '@steeze-ui/heroicons';
	import type { Load } from './__types/index';

	export const load: Load = async ({ params, fetch, session }) => {
		const trx = session.authz?.isAdmin
			? await trpc(fetch).query('transactions:read', params.id)
			: await trpc(fetch).query('owner:transactions:read', params.id);
		return { props: { trx } };
	};
</script>

<script lang="ts">
	type Transaction = InferQueryOutput<'transactions:read'>;
	export let trx: Transaction;

	const details: [string, string | null][] = [
		['Post Date', toUTCFormat(trx.postAt)],
		['Due Date', trx.dueAt ? toUTCFormat(trx.dueAt) : null],
		['Amount', kwdFormat(trx.amount)],
		['Memo', trx.memo || '-'],
		['Address', Property.getLabel(trx.lease.unit.property)],
		['Unit', Unit.getLabel(trx.lease.unit)],
	];

	$: sendEnabled = !trx.isPaid;

	const { label, color: badgeColor } = Transaction.getBadge(trx);
</script>

<Heading title="Transaction" id={trx.id} entity="transactions">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb
			crumbs={{
				lease: trx.leaseId,
				tenant: trx.lease.tenantId,
			}}
		/>
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<Button
			as="button"
			icon={ClipboardCopy}
			on:click={() => copyTrxUrl(trx.id, $page.url.origin)}
			text={'Copy public URL'}
			solid
		/>
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
<Badge {label} {badgeColor} />
<div class="grid gap-y-6">
	<DetailsPane {details} />
</div>
