import { endOfMonthN, startOfMonthN, zodDateOnly } from '@self/utils';
import { z } from 'zod';

export class DateRange {
	constructor(
		public start: string,
		public end: string,
		public months: number | null,
	) {}

	static schema = z
		.object({
			start: zodDateOnly,
			end: zodDateOnly,
		})
		.refine((data) => new Date(data.start) <= new Date(data.end));

	static createFromMonths(months: number) {
		console.log('creating range from months', months); // TODO: rm

		return new DateRange(
			isoToDate(startOfMonthN(months)),
			isoToDate(endOfMonthN(0)),
			months,
		);
	}
}

const isoToDate = (iso: string) => {
	return iso.slice(0, 10);
};
