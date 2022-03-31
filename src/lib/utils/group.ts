// import { categoryGroups, getCategoryGroup } from '$lib/config/constants';
import { categoryGroups, getCategoryGroup } from '../config/constants';
import { closestTo, eachMonthOfInterval, isSameDay } from 'date-fns';

type Grouped<T> = {
	data: T[];
	date: Date;
	category: string;
	amount: number;
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
					bucket.category?.toUpperCase() ===
						getCategoryGroup(item.category?.toUpperCase()),
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

export const groupOccupancy = (data: any, start: Date, end: Date) => {
	const months = eachMonthOfInterval({
		start,
		end,
	});

	const units = data.properties.flatMap((p) => p.units);

	const buckets: {
		date: Date;
		occupied: number;
		occupiedPct: number;
		vacant: number;
		vacantPct: number;
		count: number;
	}[] = [];
	months.forEach((date) => {
		// calculate the percentage of occupied rooms
		let vacant = 0;
		let occupied = 0;
		let count = 0;

		units.forEach((unit) => {
			// don't count units before their creation date
			if (unit.createdAt > date) return;

			count++;
			const isOccupied = unit.leases.some(
				(lease) => lease.start <= date && lease.end >= date,
			);
			if (isOccupied) {
				occupied++;
			} else {
				vacant++;
			}
		});
		buckets.push({
			date,
			vacant,
			occupied,
			count,
			occupiedPct: occupied / (occupied + vacant),
			vacantPct: vacant / (occupied + vacant),
		});
	});

	return buckets;
};

export const getMonths = <T>(data: T[], key: keyof T) => {
	const firstMonth = data[0]?.[key];
	const lastMonth = data[data.length - 1]?.[key];
	if (!firstMonth || !lastMonth) return [];

	const months = eachMonthOfInterval({
		start: firstMonth,
		end: lastMonth,
	});

	return months;
};
