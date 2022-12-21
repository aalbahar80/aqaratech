import { z } from 'zod';

import { endOfMonthN, startOfMonthN, zodDateOnly } from '@self/utils';

export class DateRange {
	static schema = z
		.object({
			start: zodDateOnly,
			end: zodDateOnly,
		})
		.refine((data) => new Date(data.start) <= new Date(data.end));

	constructor(
		public start: string,
		public end: string,
		public months: number | null,
	) {}

	static createFromMonths(months: number) {
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
