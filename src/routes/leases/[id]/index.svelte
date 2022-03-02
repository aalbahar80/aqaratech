<script lang="ts">
	import { page } from '$app/stores';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import TrxColumn from '$lib/components/tenant/TrxColumn.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import { concatIfExists } from '$lib/utils/table-utils';
	import format from 'date-fns/format';

	type Lease = NonNullable<InferQueryOutput<'leases:read'>>;
	const lease: Lease = $page.stuff.lease;
	const details: [string, string | null][] = [
		[
			'Tenant',
			concatIfExists([lease.tenant?.firstName, lease.tenant?.lastName]),
		],
		['Start Date', format(lease.startDate, 'MMM dd, yy')],
		['End Date', format(lease.endDate, 'MMM dd, yy')],
		[
			'Monthly Rent',
			lease.monthlyRent.toLocaleString('en-KW', {
				style: 'currency',
				currency: 'KWD',
				maximumFractionDigits: 0,
			}),
		],
		[
			'Deposit',
			lease.deposit.toLocaleString('en-KW', {
				style: 'currency',
				currency: 'KWD',
				maximumFractionDigits: 0,
			}),
		],
		['License', lease.license],
	];

	const files: [string, string][] = [['Lease', 'TODO implement']];
</script>

<DetailsPane {details} {files} />
<TrxColumn transactions={lease.transactions} leaseId={lease.id} />
