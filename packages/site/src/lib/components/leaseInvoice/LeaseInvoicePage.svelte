<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Transaction } from '$lib/models/classes';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import { copyTrxUrl } from '$lib/utils/copy-trx-url';
	import type { LeaseInvoiceDto } from '@self/sdk';
	import { ClipboardCopy, Mail } from '@steeze-ui/heroicons';

	type Transaction = LeaseInvoiceDto;
	export let trx: Transaction;

	const details: [string, string | null][] = [
		['Post Date', toUTCFormat(trx.postAt)],
		['Due Date', trx.dueAt ? toUTCFormat(trx.dueAt) : null],
		['Amount', kwdFormat(trx.amount)],
		['Memo', trx.memo || '-'],
		['Address', trx.breadcrumbs.property.label],
		['Unit', trx.breadcrumbs.unit.label],
	];

	$: sendEnabled = !trx.isPaid;

	const { label, color: badgeColor } = Transaction.getBadge(trx);
</script>

<Heading title="Invoice" id={trx.id} entity="leaseInvoices">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={trx.breadcrumbs} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<Button
			as="button"
			icon={ClipboardCopy}
			on:click={() => copyTrxUrl(trx.id, $page.url.origin)}
			text={'Copy public URL'}
			solid
		/>
		<!-- TODO implement nest -->
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
