<script lang="ts">
	import { page } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { kwdFormat } from '$lib/utils/common';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import type { LeaseInvoiceDto } from '@self/sdk';
	import { Check, Eye, X } from '@steeze-ui/heroicons';
	import MajesticonsNoteText from '~icons/majesticons/note-text';

	export let invoice: LeaseInvoiceDto;
	export let icons: any[];

	$: badge = getInvoiceBadge({
		dueAt: invoice.dueAt,
		isPaid: invoice.isPaid,
		postAt: invoice.postAt,
	});
</script>

<div class="px-4 py-4 sm:px-6">
	<div class="flex h-12 items-center justify-between">
		<p class="select-all truncate text-sm font-medium text-indigo-600">
			{kwdFormat(invoice.amount)}
		</p>
		<div class="flex place-items-center space-x-4">
			<Badge label={badge.label} badgeColor={badge.color} />
			<Dropdown>
				<div slot="menu">
					<DropdownMenu
						class="bottom-10"
						options={[
							{
								icon: Eye,
								label: 'View',
								href: `/${entityNameMap.leaseInvoices.urlName}/${invoice.id}`,
							},
							{
								icon: invoice.isPaid ? X : Check,
								label: invoice.isPaid ? 'Mark as unpaid' : 'Mark as paid',
								onClick: async () => {
									try {
										await $page.stuff.api.leaseInvoices.update({
											id: invoice.id,
											updateLeaseInvoiceDto: {
												isPaid: !invoice.isPaid,
												paidAt: invoice.isPaid
													? null
													: new Date().toISOString(),
											},
										});

										addSuccessToast('Invoice updated');
										invoice = await $page.stuff.api.leaseInvoices.findOne({
											id: invoice.id,
										});
									} catch (e) {
										console.error(e);
										handleApiError(e);
									}
								},
							},
						]}
					/>
				</div>
			</Dropdown>
		</div>
	</div>
	<div class="mt-2 sm:flex sm:justify-between">
		<div class="sm:flex sm:space-x-4">
			<p class="flex items-center text-sm text-gray-500">
				<MajesticonsNoteText
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				{invoice.memo}
			</p>
		</div>
	</div>
	<div class="mt-2 sm:flex sm:justify-between">
		<div class="sm:flex sm:space-x-4">
			{#each icons as { label, icon, tooltip } (tooltip)}
				{#if label}
					<p class="flex items-center text-sm text-gray-500">
						<svelte:component
							this={icon}
							class="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
						/>
						{label}
					</p>
				{/if}
			{/each}
		</div>
	</div>
</div>
