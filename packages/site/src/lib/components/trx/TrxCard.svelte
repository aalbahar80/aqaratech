<script lang="ts">
	import { goto } from '$app/navigation';
	import Badge from '$components/Badge.svelte';
	import { kwdFormat } from '$lib/utils/common';
	import {
		getBadge,
		// getMFReceiptUrl,
	} from '$models/interfaces/transaction.interface';
	import { Calendar, Cash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { format } from 'date-fns';
	import Button from '../Button.svelte';

	interface Transaction {
		id: string;
		amount: number;
		postAt: Date;
		dueAt: Date | null;
		paidAt: Date | null;
		isPaid: boolean;
		memo: string | null;
		mfPaymentId: string | null;
	}

	export let trx: Transaction;

	const badge = getBadge(trx);

	let loading = false;
	const handlePayment = async () => {
		loading = true;
		try {
			const res = await fetch(`/api/payments/getUrl?id=${trx.id}`);
			const data = await res.json();
			goto(data.mfUrl).catch(console.error);
		} catch (err) {
			console.error(err);
		} finally {
			loading = false;
		}
	};
</script>

<div class="block">
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
							>{format(trx.postAt, 'MMM dd, yy')}</time
						>
					</p>
					<p class="text flex items-center">
						{trx.memo}
					</p>
				</div>
				{#if trx.isPaid}
					<div>
						Paid
						{#if trx.paidAt}
							on
							<time dateTime={trx.paidAt.toISOString()}
								>{format(trx.paidAt, 'MMM dd, yy')}</time
							>
						{/if}
					</div>
				{:else}
					<div>
						<Button
							--min-width="6rem"
							--min-height="4rem"
							text="Pay"
							icon={Cash}
							disabled={trx.postAt > new Date()}
							{loading}
							on:click={handlePayment}
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
