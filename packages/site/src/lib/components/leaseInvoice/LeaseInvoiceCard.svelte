<script lang="ts">
	import { page, session } from '$app/stores';
	import Badge from '$lib/components/Badge.svelte';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import { addSuccessToast, handleApiError } from '$lib/stores/toast';
	import { kwdFormat } from '$lib/utils/common';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import type { LeaseInvoiceDto } from '@self/sdk';
	import { formatDistance } from 'date-fns';
	import Fa6SolidCalendarDay from '~icons/fa6-solid/calendar-day';
	import Fa6SolidEye from '~icons/fa6-solid/eye';
	import IcOutlineMoneyOff from '~icons/ic/outline-money-off';
	import IcRoundAttachMoney from '~icons/ic/round-attach-money';
	import MajesticonsNoteText from '~icons/majesticons/note-text';

	export let invoice: LeaseInvoiceDto;

	$: badge = getInvoiceBadge({
		dueAt: invoice.dueAt,
		isPaid: invoice.isPaid,
		postAt: invoice.postAt,
	});

	$: icons = [
		invoice.isPaid && invoice.paidAt
			? {
					label:
						'Paid ' +
						formatDistance(new Date(invoice.paidAt), new Date(), {
							addSuffix: true,
						}),
					icon: Fa6SolidCalendarDay,
					tooltip: 'createdAt',
			  }
			: {
					label:
						'Posted ' +
						formatDistance(new Date(invoice.postAt), new Date(), {
							addSuffix: true,
						}),
					icon: Fa6SolidCalendarDay,
					tooltip: 'createdAt',
			  },
	];
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
					<DropdownMenu>
						<MenuItem as="div" let:active>
							<a href={`/${entityNameMap.leaseInvoices.urlName}/${invoice.id}`}>
								<MenuItemChild {active}>
									<MenuItemIcon icon={Fa6SolidEye} />
									View
								</MenuItemChild>
							</a>
						</MenuItem>
						{#if $session.user?.role?.roleType === 'ORGADMIN'}
							<MenuItem as="div" let:active>
								<button
									class="w-full"
									on:click={async () => {
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
									}}
								>
									<MenuItemChild {active}>
										<MenuItemIcon
											icon={invoice.isPaid
												? IcOutlineMoneyOff
												: IcRoundAttachMoney}
										/>
										{invoice.isPaid ? 'Mark as unpaid' : 'Mark as paid'}
									</MenuItemChild>
								</button>
							</MenuItem>
						{/if}
					</DropdownMenu>
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
