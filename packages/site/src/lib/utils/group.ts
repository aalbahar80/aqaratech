import type { Client, Lease, Property, Unit } from '@prisma/client';
import { eachMonthOfInterval } from 'date-fns';

type OccupancyRawData = Client & {
	properties: (Property & {
		units: (Unit & {
			leases: Lease[];
		})[];
	})[];
};

export const groupOccupancy = (
	data: OccupancyRawData,
	start: Date,
	end: Date,
) => {
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

interface DataPoint {
	postDate: Date;
}

export const getMonths = (data: DataPoint[]) => {
	const firstMonth = data[0]?.postDate;
	const lastMonth = data[data.length - 1]?.postDate;
	if (!firstMonth || !lastMonth) return [];

	const months = eachMonthOfInterval({
		start: firstMonth,
		end: lastMonth,
	});

	return months;
};
