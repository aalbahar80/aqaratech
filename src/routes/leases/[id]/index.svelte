<script lang="ts">
	import { page } from '$app/stores';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeaseHeading from '$lib/components/lease/LeaseHeading.svelte';
	import TrxColumn from '$lib/components/tenant/TrxColumn.svelte';
	import { concatIfExists } from '$lib/utils/table-utils';
	import format from 'date-fns/format';

	const { lease } = $page.stuff;
	const details: [string, string | null][] = [
		['Tenant', concatIfExists([lease.tenant.firstName, lease.tenant.lastName])],
		['Start Date', format(lease.start, 'MMM dd, yy')],
		['End Date', format(lease.end, 'MMM dd, yy')],
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

<LeaseHeading {lease} />
<DetailsPane {details} {files} />
<TrxColumn transactions={lease.transactions} leaseId={lease.id} />
