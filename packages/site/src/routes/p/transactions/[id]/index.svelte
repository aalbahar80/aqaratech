<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import Badge from '$lib/components/Badge.svelte';
	import BreadCrumb from '$lib/components/breadcrumbs/BreadCrumb.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { Property } from '$lib/models/classes/property.class';
	import { Unit } from '$lib/models/classes/unit.class';
	import { addToast } from '$lib/stores/toast';
	import { dateFormat, kwdFormat } from '$lib/utils/common';
	import { Transaction } from '$models/classes/transaction.class';
	import { faCalendar } from '@fortawesome/free-solid-svg-icons/faCalendar';
	import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
	import { CreditCard } from '@steeze-ui/heroicons';
	import { formatDistance } from 'date-fns';
	import { onMount } from 'svelte';
	import type { Load } from './index';

	export const load: Load = async ({ params, fetch }) => {
		const { id } = params;
		const trx = await trpc(fetch).query('public:transactions:read', id);
		return { props: { trx } };
	};
</script>

<script lang="ts">
	type Transaction = NonNullable<InferQueryOutput<'public:transactions:read'>>;
	export let trx: Transaction;
	export let mfUrl: string;
	let loading = false;

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

	const handlePayment = async () => {
		// TODO: move this to use:action
		// TODO: button spinner should also be use:action
		loading = true;
		try {
			const res = await fetch(`/api/payments/getUrl?id=${trx.id}`);
			const data = await res.json();
			mfUrl = data.mfUrl;
			goto(mfUrl).catch(console.error);
		} catch (err) {
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
					subtitle: 'Failed to contact MyFatoorah',
				},
			});
		} finally {
			loading = false;
		}
	};

	const details: [string, string | null][] = [
		['Date', dateFormat(trx.postAt)],
		['Amount', kwdFormat(trx.amount)],
		['Memo', trx.memo],
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
						icon: faCalendar,
						tooltip: 'Due',
					},
			  ]
			: trx.paidAt
			? [
					{
						label: `Paid: ${formatDistance(trx.paidAt, new Date(), {
							addSuffix: true,
						})}`,
						icon: faCalendarCheck,
						tooltip: 'Paid',
					},
			  ]
			: undefined;

	const { label, color: badgeColor } = Transaction.getBadge(trx);
</script>

<Heading title={Transaction.singularCap} id={trx.id} entity="leases" {icons}>
	<svelte:fragment slot="breadcrumbs">
		<BreadCrumb crumbs={[['leases', trx.leaseId]]} />
	</svelte:fragment>
</Heading>
<Badge {label} {badgeColor} />
<DetailsPane {details} />
<div class="mt-4 flex self-end md:mt-0">
	{#if !trx.isPaid}
		<Button
			class="h-12 w-32"
			on:click={handlePayment}
			{loading}
			disabled={loading}
			icon={CreditCard}
			text="Pay"
		/>
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
