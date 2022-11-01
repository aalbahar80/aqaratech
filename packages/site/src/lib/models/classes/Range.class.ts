import { endOfMonthN, startOfMonthN } from '@self/utils';

export class DateRange {
	constructor(
		public start: string,
		public end: string,
		public months: number,
	) {}

	// static schema = z.object({
	// 	start: zodDateOnly,
	// 	end: zodDateOnly,
	// });

	static createFromMonths(months: number) {
		console.log('creating range from months', months); // TODO: rm

		return new DateRange(
			isoToDate(startOfMonthN(months)),
			isoToDate(endOfMonthN(0)),
			months,
		);
	}

	set setMonthCount(count: number) {
		this.start = isoToDate(startOfMonthN(count));
		this.end = isoToDate(endOfMonthN(0));
		this.months = count;
	}
}

const isoToDate = (iso: string) => {
	return iso.slice(0, 10);
};
