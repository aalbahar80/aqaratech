import { categoryGroups, getCategoryGroup } from '$lib/config/constants';
import { eachMonthOfInterval, closestTo, isSameDay } from 'date-fns';

type IncomeData = {
	date: Date;
	amount: number;
	isPaid: boolean;
};

export const groupIncome = (data: IncomeData[]): IncomeData[] => {
	// TODO: handle unsorted data
	const endIndex = data.length - 1;
	if (!data.length || !data[0] || !data[endIndex]) return [];
	const months = eachMonthOfInterval({
		start: data[0].date,
		end: data[endIndex]!.date,
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
		if (month) {
			// search for the bucket with the same date and same isPaid
			const index = buckets.findIndex(
				// console.log(item.date, bucket.date)
				(bucket) =>
					isSameDay(bucket.date, month) && bucket.isPaid === item.isPaid,
			);
			if (index !== -1) {
				buckets[index]!.amount += item.amount;
			}
		} else {
			console.warn('No appropriate month found');
		}
	});
	return buckets;
};

type Grouped<T> = {
	data: T[];
	date: Date;
	category?: string;
	amount?: number;
};
export const groupByMonth = <T extends { postDate: Date }>(
	data: T[],
): Grouped<T>[] => {
	const firstMonth = data[0]?.postDate;
	const lastMonth = data[data.length - 1]?.postDate;
	if (!firstMonth || !lastMonth) return [];

	const months = eachMonthOfInterval({
		start: firstMonth,
		end: lastMonth,
	});

	const buckets: Grouped<T>[] = [];
	months.forEach((date) => {
		buckets.push({
			data: [],
			date,
		});
	});

	data.forEach((item) => {
		const month = closestTo(item.postDate, months);
		if (month) {
			// search for the bucket with the same date and same isPaid
			const index = buckets.findIndex(
				// console.log(item.date, bucket.date)
				(bucket) => isSameDay(bucket.date, month),
			);
			if (index !== -1) {
				buckets[index]!.data.push(item);
			}
		} else {
			console.warn('No appropriate month found');
		}
	});
	return buckets;
};

export const groupByMonthAndCat = <
	T extends { postDate: Date; category: string | null; amount: number },
>(
	data: T[],
): Grouped<T>[] => {
	const firstMonth = data[0]?.postDate;
	const lastMonth = data[data.length - 1]?.postDate;
	if (!firstMonth || !lastMonth) return [];

	const months = eachMonthOfInterval({
		start: firstMonth,
		end: lastMonth,
	});

	const buckets: Grouped<T>[] = [];
	months.forEach((date) => {
		categoryGroups.forEach((categoryGroup) => {
			if (categoryGroup) {
				buckets.push({
					data: [],
					date,
					category: categoryGroup,
					amount: 0,
				});
			}
		});
	});

	data.forEach((item) => {
		const month = closestTo(item.postDate, months);
		if (month) {
			// search for the bucket with the same date and same isPaid
			const index = buckets.findIndex(
				// console.log(item.date, bucket.date)
				(bucket) =>
					isSameDay(bucket.date, month) &&
					bucket.category?.toUpperCase() === getCategoryGroup(item.category?.toUpperCase()),
			);
			if (index !== -1) {
				// buckets[index]!.data.push(item);
				buckets[index]!.amount += item.amount;
			}
		} else {
			console.warn('No appropriate month found');
		}
	});
	return buckets;
};
