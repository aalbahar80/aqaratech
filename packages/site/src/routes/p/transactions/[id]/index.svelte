<script context="module" lang="ts">
	import { page } from '$app/stores';

	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PayButton from '$lib/components/trx/PayButton.svelte';
	import { Property } from '$lib/models/classes/property.class';
	import { Unit } from '$lib/models/classes/unit.class';
	import { addToast } from '$lib/stores/toast';
	import { toUTCFormat, kwdFormat } from '$lib/utils/common';
	import { Transaction } from '$models/classes/transaction.class';
	import { formatDistance, isSameDay } from 'date-fns';
	import { onMount } from 'svelte';
	import Fa6SolidCalendar from '~icons/fa6-solid/calendar';
	import Fa6SolidCalendarCheck from '~icons/fa6-solid/calendar-check';
	import type { Load } from './__types/index';

	export const load: Load = async ({ params, fetch }) => {
		const { id } = params;
		const trx = await trpc(fetch).query('public:transactions:read', id);
		return { props: { trx } };
	};
</script>

<script lang="ts">
	type Transaction = NonNullable<InferQueryOutput<'public:transactions:read'>>;
	export let trx: Transaction;

	onMount(() => {
		const success = $page.url.searchParams.get('success');
		if (success === 'true') {
			addToast({
				duration: 30000,
				props: {
					kind: 'success',
					title: 'Payment successful',
				},
			});
		} else if (success === 'false') {
			addToast({
				duration: 30000,
				props: {
					kind: 'error',
					title: 'Payment failed',
				},
			});
		}

		// Ensure toast doesn't persist after page reload
		const noQuery = $page.url.origin + $page.url.pathname;
		window.history.pushState({}, '', noQuery);
	});

	const details: [string, string | null][] = [
		['Post Date', toUTCFormat(trx.postAt)],
		['Amount', kwdFormat(trx.amount)],
		['Memo', trx.memo || '-'],
		['Address', Property.getLabel(trx.lease.unit.property)],
		['Unit', Unit.getLabel(trx.lease.unit)],
	];

	const icons =
		trx.dueAt && !trx.isPaid
			? [
					{
						label: `Due: ${formatDistance(trx.dueAt, new Date(), {
							addSuffix: true,
						})}`,
						icon: Fa6SolidCalendar,
						tooltip: 'Due',
					},
			  ]
			: trx.isPaid && trx.paidAt
			? [
					{
						label: isSameDay(trx.paidAt, new Date())
							? 'Paid: today'
							: `Paid: ${formatDistance(trx.paidAt, new Date(), {
									addSuffix: true,
							  })}`,
						icon: Fa6SolidCalendarCheck,
						tooltip: 'Paid',
					},
			  ]
			: undefined;

	const { label, color: badgeColor } = Transaction.getBadge(trx);
</script>

<Heading
	title={Transaction.singularCap}
	id={trx.id}
	entity="transactions"
	{icons}
>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={{ lease: trx?.leaseId }} />
	</svelte:fragment>
</Heading>
<Badge {label} {badgeColor} />
<DetailsPane {details} />
<div class="mt-4 flex self-end md:mt-0">
	{#if !trx.isPaid}
		<PayButton {trx} />
	{:else}
		<!-- <button
			type="button"
			class="inline-flex h-12 w-32 items-center justify-center rounded-md border border-transparent border-gray-300 bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		>
			<Icon src={ReceiptTax} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
			Invoice
		</button> -->
	{/if}
</div>
