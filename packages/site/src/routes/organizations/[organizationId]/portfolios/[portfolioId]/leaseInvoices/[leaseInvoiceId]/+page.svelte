<script lang="ts">
	import { createApi } from '$api';
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
	import type { PageData } from './types';

	export let data: PageData;

	$: details = [
		['Post Date', toUTCFormat(data.leaseInvoice.postAt)],
		[
			'Due Date',
			data.leaseInvoice.dueAt ? toUTCFormat(data.leaseInvoice.dueAt) : null,
		],
		['Amount', kwdFormat(data.leaseInvoice.amount)],
		['Memo', data.leaseInvoice.memo || '-'],
		['Address', data.leaseInvoice.breadcrumbs.property.label],
		['Unit', data.leaseInvoice.breadcrumbs.unit.label],
	] as [string, string | null][];

	$: sendEnabled = !data.leaseInvoice.isPaid;

	const { label, color: badgeColor } = getInvoiceBadge(data.leaseInvoice);
</script>

<Heading title="Invoice" id={data.leaseInvoice.id} entity="leaseInvoice">
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={data.leaseInvoice.breadcrumbs} />
	</svelte:fragment>

	<svelte:fragment slot="actions">
		<!-- TODO PAYMENT -->
		<!-- <Button
			as="button"
			icon={ClipboardCopy}
			on:click={() => copyTrxUrl(data.leaseInvoice.id, $page.url.origin)}
			text={'Copy public URL'}
			solid
		/> -->
		<Button
			icon={DocumentText}
			text="Print"
			as="button"
			on:click={() =>
				createPDF({ invoice: data.leaseInvoice, outputType: 'save' })}
			class="w-full sm:w-auto"
			prefetch
		/>
		<Button
			icon={Mail}
			text={'Send email reminder'}
			solid
			disabled={!sendEnabled}
			on:click={() => {
				createApi()
					.leaseInvoices.sendEmail({ id: data.leaseInvoice.id })
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
