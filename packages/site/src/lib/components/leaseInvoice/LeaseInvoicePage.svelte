<script lang="ts">
	import { api } from '$api';
	import type { LeaseInvoiceDto } from '$api/openapi';
	import BreadCrumb from '$components/breadcrumbs/BreadCrumb.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { createPDF } from '$lib/components/leaseInvoice/invoice-to-pdf';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import { DocumentText, Mail } from '@steeze-ui/heroicons';

	type Transaction = LeaseInvoiceDto;
	export let trx: Transaction;

	$: details = [
		['Post Date', toUTCFormat(trx.postAt)],
		['Due Date', trx.dueAt ? toUTCFormat(trx.dueAt) : null],
		['Amount', kwdFormat(trx.amount)],
		['Memo', trx.memo || '-'],
		['Address', trx.breadcrumbs.property.label],
		['Unit', trx.breadcrumbs.unit.label],
	] as [string, string | null][];

	$: sendEnabled = !trx.isPaid;

	const { label, color: badgeColor } = getInvoiceBadge(trx);
</script>

<Heading title="Invoice" id={trx.id} entity="leaseInvoice">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={trx.breadcrumbs} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<!-- TODO PAYMENT -->
		<!-- <Button
			as="button"
			icon={ClipboardCopy}
			on:click={() => copyTrxUrl(trx.id, $page.url.origin)}
			text={'Copy public URL'}
			solid
		/> -->
		<Button
			icon={DocumentText}
			text="Print"
			as="button"
			on:click={() => createPDF({ invoice: trx, outputType: 'save' })}
			class="w-full sm:w-auto"
			prefetch
		/>
		<Button
			icon={Mail}
			text={'Send email reminder'}
			solid
			disabled={!sendEnabled}
			on:click={() => {
				api()
					.leaseInvoices.sendEmail({ id: trx.id })
					.then((res) => {
						addSuccessToast(res);
					})
					.catch(handleApiError);
			}}
		/>
	</svelte:fragment>
</Heading>
<Badge {label} {badgeColor} />
<div class="grid gap-y-6">
	<DetailsPane {details} />
</div>
