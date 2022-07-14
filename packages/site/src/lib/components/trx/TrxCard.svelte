<script lang="ts">
	import Badge from '$components/Badge.svelte';
	import PayButton from '$lib/components/trx/PayButton.svelte';
	import { kwdFormat, toUTCFormat } from '$lib/utils/common';
	import { getInvoiceBadge } from '$lib/utils/get-badge';
	import type { LeaseInvoiceDto } from '@self/sdk';
	import { Calendar, Cash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let trx: LeaseInvoiceDto;

	const badge = getInvoiceBadge(trx);
</script>

<div
	class="block"
	id={trx.id}
	class:isPaid={trx.isPaid}
	class:notPaid={!trx.isPaid}
>
	<div class="px-4 py-4 sm:px-6">
		<div class="flex flex-col">
			<Badge label={badge.label} badgeColor={badge.color} />
			<div class="flex items-center justify-between py-4">
				<div class="flex flex-col gap-4 text-gray-700">
					<p class="text flex items-center">
						<Icon
							src={Cash}
							theme="solid"
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
							aria-hidden="true"
						/>
						{kwdFormat(trx.amount)}
					</p>
					<p class="text flex items-center">
						<Icon
							src={Calendar}
							theme="solid"
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
							aria-hidden="true"
						/>
						<time dateTime={trx.postAt.toISOString()}
							>{toUTCFormat(trx.postAt)}</time
						>
					</p>
					<p class="text flex items-center">
						{trx.memo}
					</p>
				</div>
				{#if trx.isPaid}
					<span class="mt-4 sm:mt-0">
						<a
							href={`/p/transactions/${trx.id}`}
							class="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Details <span aria-hidden="true"> &rarr;</span>
						</a>
					</span>
				{:else}
					<div>
						<PayButton {trx} />
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
