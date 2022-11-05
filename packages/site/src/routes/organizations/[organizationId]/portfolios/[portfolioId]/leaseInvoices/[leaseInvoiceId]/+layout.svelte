<script lang="ts">
	import { createApi } from '$api';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { createPDF } from '$lib/components/leaseInvoice/invoice-to-pdf';
	import LeaseInvoiceTabs from '$lib/components/leaseInvoice/LeaseInvoiceTabs.svelte';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import { DocumentText, Mail } from '@steeze-ui/heroicons';
	import type { LayoutData } from './types';

	export let data: LayoutData;

	$: badge = getInvoiceBadge(data.leaseInvoice);
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
			disabled={data.leaseInvoice.isPaid}
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

<Badge label={badge.label} badgeColor={badge.color} />

<LeaseInvoiceTabs />

<slot />
