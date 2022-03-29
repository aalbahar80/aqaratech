import { categoryGroups, getCategoryGroup } from '$lib/config/constants';
import { getAddress } from '$lib/definitions/property';
import { closestTo, eachMonthOfInterval, isSameDay } from 'date-fns';

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

export const groupIncomeByProperty = (data: any) => {
	// TODO: handle unsorted data
	const endIndex = data.length - 1;
	if (!data.length || !data[0] || !data[endIndex]) return [];
	const months = eachMonthOfInterval({
		start: data[0].date,
		end: data[endIndex]!.date,
	});

	// const properties = data;

	const properties = data
		.map((item) => item.lease.unit.property.id)
		.filter((value, index, self) => self.indexOf(value) === index);

	type Bucket = {
		date: Date;
		amount: number;
		propertyId: string;
		address: string;
	};
	const buckets: Bucket[] = [];

	months.forEach((date) => {
		properties.forEach((propertyId) => {
			buckets.push({
				date,
				amount: 0,
				propertyId,
				address: getAddress(
					data.find((item) => item.lease.unit.property.id === propertyId)!.lease
						.unit.property,
				),
			});
		});
	});

	data.forEach((item) => {
		const month = closestTo(item.date, months);
		if (month) {
			// search for the bucket with the same date and same isPaid
			const index = buckets.findIndex(
				// console.log(item.date, bucket.date)
				(bucket) =>
					isSameDay(bucket.date, month) &&
					bucket.propertyId === item.lease.unit.property.id,
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
