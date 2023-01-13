<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutData } from './$types';

	import { getRoute, PageTab } from '@self/utils';

	import { createApi } from '$api';
	import { handleApiError } from '$api/handle-api-error';
	import L from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { createPDF } from '$lib/components/leaseInvoice/invoice-to-pdf';
	import LeaseInvoiceTabs from '$lib/components/leaseInvoice/LeaseInvoiceTabs.svelte';
	import { addSuccessToast } from '$lib/stores/toast';
	import { getInvoiceBadge } from '$lib/utils/get-badge';

	import HeroiconsDocumentText from '~icons/heroicons/document-text';
	import HeroiconsEnvelope from '~icons/heroicons/envelope';

	export let data: LayoutData;

	$: badge = getInvoiceBadge(data.leaseInvoice);
</script>

<Heading
	title={$L.entity.leaseInvoice.singular()}
	id={data.leaseInvoice.id}
	entity="leaseInvoice"
	onDelete={async (api) => {
		await api.leaseInvoices.remove({ id: data.leaseInvoice.id });

		const url = getRoute({
			entity: 'lease',
			id: data.leaseInvoice.leaseId,
			pageType: PageTab.Invoices,
			params: $page.params,
		});

		return url;
	}}
>
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
			icon={HeroiconsDocumentText}
			text="Print"
			as="button"
			on:click={async () =>
				await createPDF({ invoice: data.leaseInvoice, outputType: 'save' })}
			class="w-full sm:w-auto"
			prefetch
		/>
		<Button
			icon={HeroiconsEnvelope}
			text="Send email reminder"
			solid
			disabled={data.leaseInvoice.isPaid}
			on:click={() => {
				createApi()
					.leaseInvoices.sendEmail({ id: data.leaseInvoice.id })
					.then(() => {
						addSuccessToast();
					})
					.catch(handleApiError);
			}}
		/>
	</svelte:fragment>
</Heading>

<Badge label={badge.label} badgeColor={badge.color} />

<LeaseInvoiceTabs />

<slot />
