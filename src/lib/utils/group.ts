import { eachMonthOfInterval, closestTo, isSameDay } from 'date-fns';

type IncomeData = {
	date: Date;
	amount: number;
	isPaid: boolean;
};

export const groupIncome = (data: IncomeData[]): IncomeData[] => {
	// TODO: handle unsorted data
	if (!data.length) return [];
	const months = eachMonthOfInterval({
		start: data[0].date,
		end: data[data.length - 1].date,
	});

	const buckets: IncomeData[] = [];

	months.forEach((date) => {
		buckets.push({
			date,
			amount: 0,
			isPaid: true,
		});
		buckets.push({
			date,
			amount: 0,
			isPaid: false,
		});
	});

	data.forEach((item) => {
		const month = closestTo(item.date, months);
		console.log({ month }, 'group.ts ~ 34');
		if (month) {
			// search for the bucket with the same date and same isPaid
			const index = buckets.findIndex(
				// console.log(item.date, bucket.date)
				(bucket) =>
					isSameDay(bucket.date, month) && bucket.isPaid === item.isPaid,
			);
			if (index !== -1) {
				buckets[index].amount += item.amount;
			}
		} else {
			console.warn('No appropriate month found');
		}
	});
	console.log(buckets);
	return buckets;
};
