<script lang="ts">
	import { page } from '$app/stores';
	import type { Lease } from '@prisma/client';
	import { addMonths, format, parseISO } from 'date-fns';

	const { lease } = $page.stuff;

	function generateTransaction(lease: Lease, dueDate: string) {
		const memo = 'Rent for: ' + format(parseISO(dueDate), 'MMMM yyyy');
		const trx = {
			amount: lease.monthlyRent,
			leaseId: lease.id,
			dueDate,
			memo,
		};
		return trx;
	}

	function rents(): any[] {
		let trxList = [];
		// get the date of the 1st day of the next month
		const start = new Date(lease.start);
		const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 1);
		console.log('nextMonth: ', nextMonth);

		for (let bp = 0; bp < lease.cycleCount; bp++) {
			// TODO change to 1 month
			const dueDate = addMonths(nextMonth, bp);
			const trx = generateTransaction(lease, dueDate.toISOString());
			trxList.push(trx);
		}
		return trxList;
	}

	const rentList = rents();
</script>

<pre>{JSON.stringify(rentList, null, 2)}</pre>
